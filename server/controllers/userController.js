import consola from 'consola'
import { io } from '../listeners/socketServer'
import models from '../models/indexModel.js'
import { sessionWatcher } from '../helpers/users'
export const users = {}

export const maxClientTimeout = 2 // UDP client "timeout" in seconds
export const watchedObject = {} // Object for session but really simple and needs redoing

/**
 * Really dumb loop that looks at clients last pack send needs redoing
 */
sessionWatcher()

// User send back to register call here
export const registerUDPuser = async (data, socket) => {
  const userId = idFromSocket(socket)
  const mid = userId.toString()

  consola.info(`userController.js:registerUDPuser() Register client with id ${userId}`)

  if (socket.decoded !== false) {
    const findUDPclient = await models.udp.findOne({ where: { mid } })
    if (findUDPclient) {
      users[userId].udp.known = findUDPclient.userId
      // send back that we already have registered
      consola.info(`userController.js:registerUDPuser() client already registered ${findUDPclient.id}`)
    } else {
      await models.udp.create({
        userId: parseInt(socket.decoded.id),
        mid: idFromSocket(socket),
        game: 0,
        usage: 0,
        visibility: 0
      }).then(function (item) {
        io.to(users[userId].socket.id).emit('udpRegister', 'success')
        // send back to client
        users[userId].udp.known = { id: item.id }
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
    io.to(users[userId].socket.id).emit('udpConnect', users[userId].udp) // connect does not register client, connect just gives metadata to the connection
  }

  const udpClient = await models.udp.findOne({ where: { mid: userId } }) // Check if we know this ip
  if (udpClient) { // if we know
    users[userId].udp.known = udpClient.userId
    consola.info(`userController.js:addUDPUser() client found in db ${udpClient.id}`)
    users[userId].udp.visibility = udpClient.visibility
    users[userId].udp.usage = udpClient.usage
  } else { // if we dont know ip
    users[userId].udp.known = false
    users[userId].udp.visibility = false
    users[userId].udp.usage = false
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

// Add io users to local object to match udp and socket
export const removeIOuser = (socket) => {
  const userId = idFromSocket(socket) // Create ID
  if ((userId in users)) {
    consola.info(`userController.js:removeIOuser() removing IO user ${userId}`)
    delete users[userId].socket
  }
  // remove user
}
export const addIOuser = (socket) => {
  const userId = idFromSocket(socket) // Create ID

  consola.info(`userController.js:addIOuser() adding user with id ${userId}`)
  if (!(userId in users)) { users[userId] = {} } // If empty create

  if (('udp' in users[userId])) {
    if (('game' in users[userId].udp)) {
      consola.info(`userController.js:addIOuser() emiting connectUdp to ${socket.id}`)
      io.to(socket.id).emit('udpConnect', users[userId].udp)
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

export const makeUDPuser = (ip, gameId) => {
  if (watchedObject[ip] === undefined) {
    addUDPUser(ip, gameId)
  }
  watchedObject[ip] = ip
}

export const idFromSocket = (socket) => {
  let clientIp = '0.0.0.0'
  if ('x-real-ip' in socket.handshake.headers) {
    clientIp = socket.handshake.headers['x-real-ip'].toString()
  } else {
    clientIp = socket.handshake.address.split(':').pop().toString()
  }
  return parseInt(clientIp.split('.').reduce((a, b) => a + b, 0))
}

export const idFromIp = (ip) => {
  return parseInt(ip.split('.').reduce((a, b) => a + b, 0))
}
