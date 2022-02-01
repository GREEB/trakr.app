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
 * TODO: Cache each map and maybe, only sync db and cache to stop async calls in main function
 * category=nuxt
 */

export const throttledWrite = async (msg, rinfo, gameId) => {
  // Checksconsole.log(1);

  const userId = idFromIp(rinfo.address)
  if (users[userId] === undefined || users[userId].udp === undefined) { return }

  if (users[userId].udp.throttleTime === undefined) {
    users[userId].udp.throttleTime = 1000 / 2
  }

  // throttle
  if (Date.now() - users[userId].udp.lastSeen >= users[userId].udp.throttleTime) { // sending 12 cuz stop motion idk native is about 160
    lastSeen(users[userId])
    // throttle user differently if on frontend or not, actually genius ifelse
    if (('socket' in users[userId])) {
      users[userId].udp.throttleTime = 1000 / 12.69
    } else {
      users[userId].udp.throttleTime = 1000 / 2
    }
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
          userId: users[userId].udp.known.userId
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
export const sendInitData = async (socket, route) => {
  // route has route infos
  // {                                                                                                                                                                                                                           21:08:23
  //   slug: 'fh5',
  //   name: 'm-slug'
  // }
  let gameId
  if (route.name === 'index' && socket.decoded.id !== undefined) {
    await models.position.findAll({
      where: {
        userId: socket.decoded.id
      },
      raw: true,
      attributes: ['x', 'y', 'z']
    }).then(function (alluserPos) {
      const serializedAsBuffer = pack({ alluserPos })
      io.to(socket.id).emit('chordPack', serializedAsBuffer)
    }).catch(function (err) {
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
      consola.error(err)
    })

    // u-slug
  } else if (route.name === 'u-slug') {
    const isUUID = await validUUID(route.slug)
    if (!isUUID) {
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
      return
    }
    const uid = route.slug
    await models.position.findAll({
      where: {
        userId: uid
      },
      raw: true,
      attributes: ['x', 'y', 'z']
    }).then(function (alluserPos) {
      const serializedAsBuffer = pack({ alluserPos })
      io.to(socket.id).emit('chordPack', serializedAsBuffer)
    }).catch(function (err) {
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
      consola.error(err)
    })
    // m-slug
  } else if (route.name === 'm-slug') {
    gameId = gameSlug2Id(route.slug)
    if (gameId === false || gameId === undefined) {
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
      return
    }

    await models.position.findAll({
      where: {
        gameId
      },
      raw: true,
      attributes: ['x', 'y', 'z']
    }).then(function (alluserPos) {
      const serializedAsBuffer = pack({ alluserPos })
      io.to(socket.id).emit('chordPack', serializedAsBuffer)
    }).catch(function (err) {
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
      consola.error(err)
    })
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
function validUUID (str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  return regexExp.test(str)
}
// function niceBytes (x) {
//   let l = 0; let n = parseInt(x, 10) || 0
//   const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
//   while (n >= 1024 && ++l) {
//     n = n / 1024
//   }

//   return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
// }
