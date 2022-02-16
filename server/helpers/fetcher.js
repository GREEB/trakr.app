// Premade fetches
import { pack } from 'msgpackr'
import consola from 'consola'
import { Op } from 'sequelize'
import models from '../models'
import { io } from '../listeners/socketServer'

export const fetchFromGameSlug = async (socket, gameId) => {
  // TODO: Get this data over its client so we can first only take clients with visibility 0 and then we can do checks on all of these
  await models.Clients.findAll({
    where: {
      game: gameId,
      usage: {
        [Op.ne]: 2 // If usage is set to modding we ignore client
      },
      visibility: {
        [Op.eq]: 0 // If visibility is not 0 we ignore client
      }
    },
    attributes: [], // Don't need any client attributes for maps
    include: {
      model: models.Positions,
      where: {
        normSuspensionTravelSum: { // dont display flying data on frontend helps with point from ppl teleporting even tho they shouldn't? can be undone when soft banning is on
          [Op.gt]: process.env.MAXSUSPENSION || 0.4 // basically how much we remove points with low suspenstiontravelsum
        }
      },
      attributes: ['x', 'y', 'z'] // attributes we want
    },
    nest: true,
    raw: true
  })
    .then(function (result) {
      const alluserPos = result.map(function (obj) {
        return [obj.Positions.x, obj.Positions.y, obj.Positions.z]
      })
      // console.log(alluserPos)
      // const emptyObj = []
      // alluserPos.forEach((client) => {
      //   console.log(client)
      // })
      // console.log(emptyObj)
      const serializedAsBuffer = pack({ alluserPos })
      io.to(socket.id).emit('chordPack', serializedAsBuffer)
      // we get a bunch of clients
      // io.to(socket.id).emit('chordPack', serializedAsBuffer)
    })
    .catch(function (err) {
      consola.log(err)
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
    })
  // await models.Positions.findAll({
  //   where: {
  //     gameId,
  // normSuspensionTravelSum: { // dont display flying data on frontend helps with point from ppl teleporting even tho they shouldn't? can be undone when soft banning is on
  //   [Op.gt]: process.env.MAXSUSPENSION || 0.4 // basically how much we remove points with low suspenstiontravelsum
  // },
  //     usage: { // dont display flying data on frontend helps with point from ppl teleporting even tho they shouldn't? can be undone when soft banning is on
  //       [Op.ne]: 2 // basically how much we remove points with low suspenstiontravelsum
  //     }
  //   },
  //   raw: true,
  //   attributes: ['x', 'y', 'z']
  // }).then(function (alluserPos) {
  //   const serializedAsBuffer = pack({ alluserPos })
  //   io.to(socket.id).emit('chordPack', serializedAsBuffer)
  // }).catch(function (err) {
  //   io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
  //   consola.error(err)
  // })
}
export const fetchFromUserId = async (socket, id) => {
// first we get
  const client = await models.Clients.findAll({
    nest: true,
    raw: true,
    where: {
      userId: id
    },
    attributes: [],
    include: {
      model: models.Positions,
      attributes: ['x', 'y', 'z']
    }
  }).then(function (result) {
    const alluserPos = result.map(function (obj) {
      return [obj.Positions.x, obj.Positions.y, obj.Positions.z]
    })
    const serializedAsBuffer = pack({ alluserPos })
    io.to(socket.id).emit('chordPack', serializedAsBuffer)
  })
    .catch(function (err) {
      consola.log(err)
      io.to(socket.id).emit('error', { code: 404, msg: 'Page not found' })
    })
  if (client === undefined || client === null) {
    // no client found for this user
    return
  }
  await models.Positions.findAll({
    where: {
      clientId: client.id
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
