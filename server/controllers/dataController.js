import { pack } from 'msgpackr'
import consola from 'consola'
import { io } from '../listeners/socketServer'
import models from '../models/indexModel'
import { lastSeen } from '../helpers/users'
import { users, idFromIp } from './userController.js'

export const throttledWrite2 = async (msg, rinfo, gameId) => {
  const userId = idFromIp(rinfo.address)
  if (users[userId].udp === undefined) { return }

  // if (users[userId] === undefined || users[userId].udp === undefined || users[userId].udp.known === false || Object.keys(users[userId].udp).length === 0) { return }

  // // this is basically throttling itself not sure if good option
  if (Date.now() - users[userId].udp.lastSeen >= 50) {
    lastSeen(users[userId])
  } else {
    return
  }
  // await models.position.create({
  //   raw: msg,
  //   userId: users[userId].udp.known.id
  // }).catch(function (err) {
  //   consola.error(err)
  // })

  // we create a parser for menu for each game
  if (('socket' in users[userId])) {
    io.to(users[userId].socket.id).emit('chord', msg)
  }
  // io.to('home').emit('chord', msg)
  // const parsed = games[gameId].parser.parse(Buffer.from(msg, 'hex'))
  // console.log(parsed)
}

/**
 * ThrottledWrite is the function we send udp packet to, we auth it here and send data to socket and DB
 *
 * @param  {Float} x
 * @param  {Float} y
 * @param  {Float} z
 * @param  {Float} speed
 * @param  {Float} surface
 * @param  {Float} flying
 * @param  {String} ip
 * @param  {Integer} size
 * @param  {Integer} userID
 */
export const throttledWrite = async (x, y, z, s, r, flying, yaw, pitch, roll, ip, size, userID) => {
  const userId = idFromIp(ip)

  const now = Date.now()
  const speed2kmh = Math.abs(Math.round(s * 2.237)) * 1.60934
  // const twenymil = 2 * Math.pow(10, 7)

  // const speedo = Math.pow(speed2kmh, -2) * 100000

  if (now - users[userId].udp.lastSeen >= 1000) {
    users[userId].udp.lastSeen = now
  } else {
    return
  }

  if (users[userId] === undefined || users[userId].udp.known === false || Object.keys(users[userId].udp).length === 0) { return }

  await models.position.create({
    x,
    y,
    z,
    r,
    userId: users[userId].udp.known.id
  }).catch(function (err) {
    console.log(err)
  })
  const obj2Send = { x, y, z, s: r, yaw, pitch, roll, speed2kmh }
  const serializedAsBuffer = pack({ obj2Send })
  if ('socket' in users[userId]) {
    io.to(users[userId].socket.id).emit('chord', serializedAsBuffer)
  }
  io.to('home').emit('chord', serializedAsBuffer)
}
/**
 * @param  {Object} socket
 */
export const sendInitData = async (socket) => {
  if (socket.decoded === false) { return }
  // room by path?
  if (socket.rooms.has('home')) {
    const alluserPos = await models.position.findAll({
      raw: true,
      attributes: ['x', 'y', 'z', ['r', 's']]
    })
    const serializedAsBuffer = pack({ alluserPos })
    io.to(socket.id).emit('chordPack', serializedAsBuffer)
  } else {
    const alluserPos = await models.position.findAll({
      raw: true,
      where: {
        userId: socket.decoded.id
      },
      attributes: ['x', 'y', 'z', ['r', 's']]
    })
    const serializedAsBuffer = pack({ alluserPos })
    io.to(socket.id).emit('chordPack', serializedAsBuffer)
    console.log(niceBytes(serializedAsBuffer.length))
  }

// let data = unpack(serializedAsBuffer);
  // console.log(alluserPos)
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

function niceBytes (x) {
  let l = 0; let n = parseInt(x, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }

  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
}
