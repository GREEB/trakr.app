import consola from 'consola'
import { io } from '../listeners/socketServer'
import models from '../models/indexModel'
import { lastSeen } from '../helpers/users'
import { users, idFromIp } from './userController.js'

export const throttledWrite2 = async (msg, rinfo, gameId) => {
  const userId = idFromIp(rinfo.address)
  if (users[userId].udp === undefined) { return }

  // if (users[userId] === undefined || users[userId].udp === undefined || users[userId].udp.known === false || Object.keys(users[userId].udp).length === 0) { return }

  // this is basically throttling itself not sure if good option
  // let user change this means lot more data
  if (Date.now() - users[userId].udp.lastSeen >= 250) {
    lastSeen(users[userId])
  } else {
    return
  }
  // send raw telemetry to user
  if (('socket' in users[userId])) {
    io.to(users[userId].socket.id).emit('chord', msg)
  }
  // If we know client save data
  // await models.position.create({
  //   raw: msg,
  //   userId: users[userId].udp.known.id
  // }).catch(function (err) {
  //   consola.error(err)
  // })

  // send any data to global room
  io.to('gameName').emit('chord', msg)
  // const parsed = games[gameId].parser.parse(Buffer.from(msg, 'hex'))
  // console.log(parsed)
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

function niceBytes (x) {
  let l = 0; let n = parseInt(x, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }

  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
}
