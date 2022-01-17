import throttle from 'lodash.throttle'
import onChange from 'on-change'
import consola from 'consola'
import { age } from '../helpers/defaults.js'
import { io } from '../listeners/socketServer' // Main user obj to look at
import models from '../models/indexModel.js'

export const users = {}

const maxClientTimeout = 10 // UDP client "timeout" in seconds

const udpClients = {}

setInterval(() => {
  // console.log(users)
  Object.keys(users).forEach((id) => {
    if (age(users[id]) > maxClientTimeout) { delete users[id] }
  })
}, 3000)

export const lastSeen = (obj) => {
  const user = obj
  user.udp.lastSeen = Date.now()
}

// User send back to register call here
export const registerUDPUser = async (data, socket) => {
  console.log('register udp')
  const userId = idFromSocket(socket)
  const mid = userId.toString()

  if (socket.decoded !== false) {
    const findUDPclient = await models.udp.findOne({
      where: {
        mid
      }
    })
    if (findUDPclient) {
      users[userId].udp.known = { id: findUDPclient.id }

      // found client
      // send back that we already have registered
      console.log('client already registered')
    } else {
      // create client
      const createUDPclient = await models.udp.create({
        userId: socket.decoded.id,
        mid: idFromSocket(socket),
        game: data.data
      })
      // send back to client
      users[userId].udp.known = { id: createUDPclient.id }
    }
  }
  // return not authed
}

export const addUDPUser = async (ip) => {
  const userId = idFromIp(ip).toString()
  if (!(userId in users)) {
    users[userId] = {}
  } // If empty create
  if (users[userId].udp === undefined) {
    users[userId].udp = {}
  }

  // Check if we know this ip
  const udpClient = await models.udp.findOne({ where: { mid: userId } })

  if (udpClient) {
    // Add udp to user
    users[userId].udp.known = { id: udpClient.id }
    consola.log('udpClient: client found in db')
  } else {
    // if user online
    if ((userId in users) && users[userId].socket !== undefined) {
      io.to(users[userId].socket.id).emit('registerUdp')
    } else {
      users[userId].udp.known = false
      // unreg and not on frontend
    }
    consola.log('udpClient: client not found in db')
  }
  users[userId].udp.lastSeen = null
  users[userId].udp.firstSeen = Date.now()
  // if (!(userId in users)) {
  //   consola.info('UDP: User not on website')
  //   // If empty = user not on website
  //   users[userId] = {}
  // } else {
  //   // user on website
  //   consola.info('UDP: User on website', users[userId].auth)
  //   if (users[userId].auth !== false) {
  //     // and authed already
  //     consola.info('UDP: SocketIo found & authed', users[userId].auth)
  //     const mid = userId
  //     const findUDPclient = await Udp.findOne({
  //       where: {
  //         mid
  //       }
  //     })
  //     if (!findUDPclient) {
  //       // no UDP Client found ask to register
  //       io.to(users[userId].socket.id).emit('registerUdp')
  //     } else {
  //       // client found
  //       console.log(findUDPclient)
  //     }
  //   } else {
  //     consola.info('UDP: SocketIo found & not authed', users[userId].auth)
  //   }
  // not authed but on website, ask to login?
  // }
}

// Add io users to local object to match udp and socket
export const addIOuser = (socket) => {
  const userId = idFromSocket(socket) // Create ID
  if (!(userId in users)) { users[userId] = {} } // If empty create

  if (socket.decoded === false) {
    // Add connectino with no auth for global map
    users[userId].auth = false
  } else {
    // Socket has auth
    users[userId].auth = socket.decoded
    users[userId].auth.cookie = socket.handshake.headers.cookie
  }

  if (users[userId].udp !== undefined && users[userId].udp.known === false) {
    io.to(socket.id).emit('registerUdp')
  }

  users[userId].socket = {}
  users[userId].socket.id = socket.id
  users[userId].socket.lastSeen = null
  users[userId].socket.firstSeen = Date.now()
  // if (dc['auth._token.discord']) {
  //   users[userID].dc = {}
  //   users[userID].dc.username = dc.username
  //   users[userID].dc.avatar = dc.avatar
  //   users[userID].dc.id = dc.id
  //   users[userID].dc.token = dc['auth._token.discord']
  //   users[userID].dc.token_expiration = dc['auth._token_expiration.discord']
  //   users[userID].dc.refresh_token = dc['auth._refresh_token.discord']
  //   users[userID].dc.token_expiration = dc['auth._refresh_token_expiration.discord']
  // } else {
  //   users[userID].dc = false
  // }
  // io.to(socket.id).emit('registerUdp')
}

const watchedObject = onChange(udpClients, (path, value, previousValue) => {
  if (previousValue === undefined) {
    console.log(`${value} connected to UDP`)
    addUDPUser(value)
  }
  // if previousValue != undefined && value === unix then update
  // if (value != undefined)
  // defudpClients[path] = value
})

// Basically add user on first connect
export const makeUDPuser = throttle((ip) => {
  watchedObject[ip] = ip
}, 3000)

export const idFromSocket = (socket) => {
  let clientIp = '0.0.0.0'
  if ('x-real-ip' in socket.handshake.headers) {
    clientIp = socket.handshake.headers['x-real-ip']
  } else {
    clientIp = socket.handshake.address.split(':').pop().toString()
  }
  return parseInt(clientIp.split('.').reduce((a, b) => a + b, 0))
}

export const idFromIp = (ip) => {
  return parseInt(ip.split('.').reduce((a, b) => a + b, 0))
}
