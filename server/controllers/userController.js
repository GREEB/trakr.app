import consola from 'consola'
import ipaddr from 'ipaddr.js'
import { io } from '../listeners/socketServer'
import models from '../models/indexModel.js'
import { sessionWatcher, age } from '../helpers/users'
import { sleep } from '../helpers/defaults'
import { hash } from '../helpers/crypto' // Object for session but really simple and needs redoing
export const users = {}
export const maxClientTimeout = process.env.UDPTIMEOUT || 2 // UDP client "timeout" in seconds
export const watchedObject = {}
/**
 * Really dumb loop that looks at clients last pack send needs redoing
 */
sessionWatcher()

// User send back to register call here
export const registerUDPuser = async (data, socket) => {
  const userId = idFromSocket(socket)

  if (socket.decoded !== false) {
    consola.info(`userController.js:registerUDPuser() Register client with id ${userId}`)

    const findUDPclient = await models.udp.findOne({ where: { mid: hash(userId) } })
    if (findUDPclient) {
      users[userId].udp.known = findUDPclient.dataValues
      // send back that we already have registered
      consola.info(`userController.js:registerUDPuser() client already registered ${findUDPclient.id}`)
    } else {
      await models.udp.create({
        userId: socket.decoded.id,
        mid: hash(userId),
        game: 0,
        usage: data.data.usage,
        mode: data.data.mode,
        visibility: data.data.visibility
      }).then(function (item) {
        io.to(users[userId].socket.id).emit('udpRegister', 'success')
        consola.info(`userController.js:registerUDPuser() client successfully registered sending udpRegister/success to ${users[userId].socket.id}`)
        // send back to client
        users[userId].udp.known = item.dataValues
      }).catch(function (err) {
        consola.error(err)
        io.to(users[userId].socket.id).emit('udpRegister', 'error')
      })
    }
  }
}

export const addUDPUser = async (ip, gameId) => {
  const userId = idFromIp(ip).toString()
  consola.info(`userController.js:addUDPUser() adding user with id ${userId}`)

  if (!(userId in users)) { users[userId] = {} }
  if (users[userId].udp === undefined) { users[userId].udp = {} }
  if (('socket' in users[userId])) { // If online on frontend, send udpConnect ping
    consola.info(`userController.js:addIOuser() emiting connectUdp to ${users[userId].socket.id}`)
    io.to(users[userId].socket.id).emit('udpConnect', gameId) // connect does not register client, connect just gives metadata to the connection
  }

  const udpClient = await models.udp.findOne({ where: { mid: hash(userId) } }) // Check if we know this ip
  if (udpClient) { // if we know
    users[userId].udp.known = udpClient.dataValues
    consola.info(`userController.js:addUDPUser() client found in db ${udpClient.id}`)
  } else { // if we dont know ip
    users[userId].udp.known = false
    if ((userId in users) && users[userId].socket !== undefined) {
      io.to(users[userId].socket.id).emit('udpRegister', 'new')
    }
    consola.info(`userController.js:addUDPUser() client not found in db ${userId}`)
  }
  users[userId].udp.ip = ip
  users[userId].udp.game = gameId
  users[userId].udp.lastSeen = null
  users[userId].udp.firstSeen = Date.now()
}

/**
 * Removes io user from session manager
 * @param {Object} socket Socket to remove
 */
export const removeIOuser = (socket) => {
  const userId = idFromSocket(socket) // Create ID
  if ((userId in users)) {
    consola.info(`userController.js:removeIOuser() removing IO user ${userId}`)
    if ('udp' in users[userId]) {
      delete users[userId].socket
      delete users[userId].auth
    } else {
      delete users[userId]
    }
  }
  // remove user
}
/**
 * Removes UDP user from session manager
 * @param {String} id id of user in session manager
 */
export const removeUDPuser = async (id) => {
  consola.info(`userController.js:removeUDPuser() trying to deleting UDP ${id}`)
  // dumb fix but we wait a few ticks and recheck before deleting
  await sleep((maxClientTimeout * 1000) / 10)
  if (users[id].udp.lastSeen !== null && age(users[id]) > maxClientTimeout) {
    consola.success(`userController.js:removeUDPuser() deleting UDP ${id}`)
    if ('socket' in users[id]) { // send disconnect ping
      io.to(users[id].socket.id).emit('udpDisconnect')
      delete watchedObject[users[id].udp.ip]
      delete users[id].udp
    } else {
      delete watchedObject[users[id].udp.ip]
      delete users[id]
    }
  } else {
    consola.info(`userController.js:removeUDPuser() not deleting UDP still here after recheck ${id}`)
  }
}
/**
 * Add socket to session manager
 * @param {Object} socket - Socket to add from
 */
export const addIOuser = (socket) => {
  const userId = idFromSocket(socket) // Create ID

  consola.info(`userController.js:addIOuser() adding user with id ${userId}`)
  if (!(userId in users)) { users[userId] = {} } // If empty create

  if ('socket' in users[userId]) {
    console.log('socket already found')
    // already socket from this ip disconnect and redirect
    io.to(socket.id).emit('error', { code: 429, msg: 'Too Many Requests; You can only have one tab open on the same connection, for now.' })
    socket.disconnect()
    return
  }

  if (('udp' in users[userId])) {
    if (('game' in users[userId].udp)) {
      consola.success(`userController.js:addIOuser() emiting connectUdp to ${socket.id}`)
      io.to(socket.id).emit('udpConnect', users[userId].udp.game)
    }
  }

  if (socket.decoded === false) {
    users[userId].auth = false
  } else {
    users[userId].auth = socket.decoded
    users[userId].auth.cookie = socket.handshake.headers.cookie
  }
  if (users[userId].udp !== undefined && users[userId].udp.known === false) { // if has udp
    consola.info(`userController.js:addIOuser() emiting udpRegister new to ${socket.id}`)

    io.to(socket.id).emit('udpRegister', 'new')
  }

  users[userId].socket = {}
  users[userId].socket.id = socket.id
  users[userId].socket.lastSeen = null
  users[userId].socket.firstSeen = Date.now()
}

/**
 * Dumb udp session manager adds ip = ip to an object
 * @param {String} ip - user's ip address in ipv6
 * @param {Integer} gameId - game id as in port - 1024
 */
export const makeUDPuser = (ip, gameId) => {
  if (watchedObject[ip] === undefined) {
    addUDPUser(ip, gameId)
  }
  watchedObject[ip] = ip
}

// TODO: check for forwarded ip to not block full companies/institutes and stuff
// category=nuxt
/**
 * Getting id from socket basically ip
 * @param {*} socket - socket to extract ip from
 * @returns Ip as a string
 */
export const idFromSocket = (socket) => {
  if (socket.handshake.headers.origin === 'http://localhost:3000') {
    return '127.0.0.1'
  }
  let clientIp = '0.0.0.0'
  if ('x-forwarded-for' in socket.handshake.headers) {
    clientIp = idFromIp(socket.handshake.headers['x-forwarded-for'])
  } else if ('x-real-ip' in socket.handshake.headers) {
    clientIp = idFromIp(socket.handshake.headers['x-real-ip'])
  } else {
    clientIp = idFromIp(socket.handshake.address)
  }
  return clientIp
}

/**
 *
 * @param {String} ip - ip in ipv6 format as string
 * @returns ip in ipv4 or ipv6
 */
export const idFromIp = (ip) => {
  if (ipaddr.IPv6.isValid(ip)) {
    const addr = ipaddr.IPv6.parse(ip)
    if (addr.isIPv4MappedAddress()) {
      return addr.toIPv4Address().toString()
    } else {
      return addr.toString()
    }
  } else if (ipaddr.IPv4.isValid(ip)) {
    return ip
  }
}
