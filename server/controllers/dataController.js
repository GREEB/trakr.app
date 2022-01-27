// import consola from 'consola'
import tx2 from 'tx2'
import { io } from '../listeners/socketServer'
// import models from '../models/indexModel'
import { lastSeen } from '../helpers/users'
import { games } from '../../assets/js/games'
import { users, idFromIp } from './userController.js'
// only data mode implemented for now will be mapping, so only xyz and maybe rumble/surface for each point?
// we check what mode user is in
// set throttle based on mode and only save data we need, maybe send full telemetry to frontend

const meter = tx2.meter({
  name: 'sending io out /sec',
  samples: 1,
  timeframe: 60
})
export const throttledWrite = (msg, rinfo, gameId) => {
  // Checks
  const userId = idFromIp(rinfo.address)
  if (users[userId].udp === undefined) { return }

  // throttle
  if (Date.now() - users[userId].udp.lastSeen >= 1000 / 12.69) { // sending 12 cuz stop motion idk native is about 160
    lastSeen(users[userId])
  } else {
    return
  }

  // parse
  const parsed = games[gameId].parsers.xyz.parse(Buffer.from(msg, 'hex'))
  if (parsed.PositionX === 0 || parsed.PositionY === 0 || parsed.PositionZ === 0) { return }

  // See if user is known or not if not just send back chord
  if (('socket' in users[userId]) && users[userId].udp.known === false) {
    // what are we sending back? default xyz data for game?
    // parse only xyz and surface here
    // io.to('gameName').emit('chord', msg) // maybe dont send raw tel of everyone to global map
    meter.mark()
    io.to(users[userId].socket.id).emit('chord', msg)
  }

  // User is known look what we need to save and send
  // if (users[userId].udp.known !== undefined) {
  //   // look at mode even tho user can only have x atm, tells us what to do with data
  //   if (users[userId].udp.known.mode === 0) {
  //     // parse only xyz and surface here
  //     await models.position.create({
  //       x: parsed.x,
  //       y: parsed.y,
  //       z: parsed.z,
  //       userId: users[userId].udp.known.id
  //     }).catch(function (err) {
  //       consola.error(err)
  //     })
  //     io.to(users[userId].socket.id).emit('chord', parsed)
  //     // Visibility check
  //     if (users[userId].udp.known.visibility === 1) { return }
  //     io.to('gameName').emit('chord', parsed)
  //   }
  // }
}
export const throttledWrite2 = (msg, rinfo, gameId) => {
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

// const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

// function niceBytes (x) {
//   let l = 0; let n = parseInt(x, 10) || 0

//   while (n >= 1024 && ++l) {
//     n = n / 1024
//   }

//   return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
// }
