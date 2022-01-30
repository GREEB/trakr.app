import consola from 'consola'
import { pack } from 'msgpackr'
import { io } from '../listeners/socketServer'
import models from '../models/indexModel'
import { lastSeen, lastSaved } from '../helpers/users'
import { games } from '../../assets/js/games'
import metrics from '../helpers/metrics'
import { users, idFromIp } from './userController.js'
// only data mode implemented for now will be mapping, so only xyz and maybe rumble/surface for each point?
// we check what mode user is in
// set throttle based on mode and only save data we need, maybe send full telemetry to frontend
/**
 * TODO: Cache each map and maybe only sync db and cache to stop async calls in main function
 * category=nuxt
 */

export const throttledWrite = async (msg, rinfo, gameId) => {
  // Checks
  const userId = idFromIp(rinfo.address)
  if (users[userId] === undefined || users[userId].udp === undefined) { return }

  // throttle
  if (Date.now() - users[userId].udp.lastSeen >= 1000 / 12.69) { // sending 12 cuz stop motion idk native is about 160
    lastSeen(users[userId])
  } else {
    return
  }

  // parse
  const parsed = games[gameId].parsers.xyz.parse(Buffer.from(msg, 'hex'))
  // const parseFull = games[gameId].parsers.full.parse(Buffer.from(msg, 'hex'))
  if (parsed.PositionX === 0 || parsed.PositionY === 0 || parsed.PositionZ === 0) { return }

  // See if user is known or not if not just send back chord
  if (('socket' in users[userId]) && users[userId].udp.known === false) {
    // what are we sending back? default xyz data for game?
    // parse only xyz and surface here
    // io.to('gameName').emit('chord', msg) // maybe dont send raw tel of everyone to global map
    io.to(users[userId].socket.id).emit('chord', msg)
    metrics.ioOut.mark()
  }

  // User is known look what we need to save and send
  // Throttle this again to not save as much as we send?

  if (users[userId].udp.known !== false) {
    // look at mode even tho user can only have x atm, tells us what to do with data
    if (users[userId].udp.known.mode === 0) {
      if (Date.now() - users[userId].lastSaved >= 1000 / 2 || users[userId].lastSaved === undefined) { // sending 12 cuz stop motion idk native is about 160
        metrics.data2db.mark()
        // parse only xyz and surface here
        await models.position.create({
          x: parsed.PositionX,
          y: parsed.PositionY,
          z: parsed.PositionZ,
          inPuddleSum: parsed.WheelInPuddle.reduce((partialSum, a) => partialSum + a, 0).toFixed(2),
          surfaceRumbleSum: parsed.SurfaceRumble.reduce((partialSum, a) => partialSum + a, 0).toFixed(2),
          normSuspensionTravelSum: parsed.NormSuspensionTravel.reduce((partialSum, a) => partialSum + a, 0).toFixed(2),
          gameId,
          userId: users[userId].udp.known.id
        }).catch(function (err) {
          consola.error(err)
        })
        if (users[userId].udp.known.visibility === 1) { return }
        io.to(id2GameSlug(gameId)).emit('globalChord', parsed)
        lastSaved(users[userId])
      }
      if ('socket' in users[userId]) {
        io.to(users[userId].socket.id).emit('chord', msg)
      }
      // Visibility check
      // console.log('visibility; ' + users[userId].udp.known.visibility)
    }
  }
}
export const sendInitData = async (socket, gameSlug) => {
  // visibility  not implemented yet
  // Send init data
  let gameId
  // Send map data
  if (gameSlug === 'home' && socket.decoded !== false) {
    // Send User only data
    const alluserPos = await models.position.findAll({
      where: {
        userId: socket.decoded.id
      },
      raw: true,
      attributes: ['x', 'y', 'z']
    })
    const serializedAsBuffer = pack({ alluserPos })
    io.to(socket.id).emit('chordPack', serializedAsBuffer)
  } else if (typeof gameSlug === 'string' && gameSlug !== 'home') {
    gameId = gameSlug2Id(gameSlug)
    const alluserPos = await models.position.findAll({
      where: {
        gameId
      },
      raw: true,
      attributes: ['x', 'y', 'z']
    })
    const serializedAsBuffer = pack({ alluserPos })
    io.to(socket.id).emit('chordPack', serializedAsBuffer)
  }
}

function gameSlug2Id (slug) {
  for (const [key, value] of Object.entries(games)) {
    if (value.slug === slug) {
      return key
    }
  }
}

function id2GameSlug (originalKey) {
  for (const [key, value] of Object.entries(games)) {
    if (parseInt(key) === parseInt(originalKey)) {
      return value.slug
    }
  }
}

// function niceBytes (x) {
//   let l = 0; let n = parseInt(x, 10) || 0
//   const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
//   while (n >= 1024 && ++l) {
//     n = n / 1024
//   }

//   return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
// }
