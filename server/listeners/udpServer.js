import dgram from 'dgram'
import consola from 'consola'
import { makeUDPuser } from '../controllers/userController'
import { throttledWrite2 } from '../controllers/dataController' // udp6 for ipv6 support
import { games } from '../../assets/js/games' // ewww path

const servers = {}
export function makeServers () {
  Object.entries(games).forEach(
    ([gameIdString, game]) => {
      const gameId = parseInt(gameIdString)

      servers[gameId] = dgram.createSocket('udp4')
      servers[gameId].on('message', (msg, rinfo) => {
        if (rinfo !== undefined) {
          makeUDPuser(rinfo.address, gameId)
          throttledWrite2(msg, rinfo, gameId)
        }
      })
      servers[gameId].bind(gameId + 1024)

      servers[gameId].on('listening', () => {
        const address = servers[gameId].address()
        consola.success(`UDP for ${game.gameName} listening on ${address.port}`)
      })
      servers[gameId].on('connect', () => {
        consola.success('UDP for connect')
      })
      servers[gameId].on('error', (err) => {
        consola.error(`UDP error:\n${err.stack}`)
        servers[gameId].close()
      })

      servers[gameId].on('close', (err) => {
        consola.error(`UDP error:\n${err}`)
      })
    }
  )
}
// export function makeServers () {
//   Object.entries(games).forEach(
//     ([gameName, game]) => {
//       servers[game.id] = dgram.createSocket('udp4')

//       servers[game.id].on('message', (msg, rinfo) => {
//         if (rinfo !== undefined) {
//           makeUDPuser(rinfo.address)
//         }
//         throttledWrite2(msg, rinfo)
//         console.log(this)
//       })
//       servers[game.id].bind(game.id + 1024)

//       servers[game.id].on('listening', () => {
//         const address = servers[game.id].address()
//         consola.info(`udp for ${game.name} listening on ${address.address}:${address.port}`)
//       })
//       servers[game.id].on('error', (err) => {
//         consola.error(`udpServer error:\n${err.stack}`)
//         servers[game.id].close()
//       })

//       servers[game.id].on('close', (err) => {
//         consola.error(`udpServer error:\n${err}`)
//       })
//     }
//   )
// }

//  // Look at config and build data from it
//  let flying = 1
//  let surface = 0

//  // Road edgde detection build in?
//  // WheelOnRumbleStripFl(this byte[] bytes) { return GetSingle(bytes, 116)
//  const yaw = parseFloat(msg.readFloatLE(56))
//  const pitch = parseFloat(msg.readFloatLE(60))
//  const roll = parseFloat(msg.readFloatLE(64))

//  // public static float Speed(this byte[] bytes) { return GetSingle(bytes, 244 + BufferOffset); }
//  // Get Dirt tele to see if not on real road
//  // SurfaceRumbleRr(this byte[] bytes) { return GetSingle(bytes, 160)
//  const srFL = parseFloat(msg.readFloatLE(148))
//  const srFR = parseFloat(msg.readFloatLE(152))
//  const srRL = parseFloat(msg.readFloatLE(156))
//  const srRR = parseFloat(msg.readFloatLE(160))

//  // If all 4 Wheels are in a puddle add as water point
//  // public static float WheelInPuddleRr(this byte[] bytes) { return GetSingle(bytes, 144)
//  const wipFL = parseInt(msg.readFloatLE(132), 10)
//  const wipFR = parseInt(msg.readFloatLE(136), 10)
//  const wipRL = parseInt(msg.readFloatLE(140), 10)
//  const wipRR = parseInt(msg.readFloatLE(144), 10)

//  // Get suspension to check if wheel in the air?
//  // public static float NormSuspensionTravelRr(this byte[] bytes) { return GetSingle(bytes, 80)
//  const nstFL = parseFloat(msg.readFloatLE(68)).toFixed(1)
//  const nstFR = parseFloat(msg.readFloatLE(72)).toFixed(1)
//  const nstRL = parseFloat(msg.readFloatLE(76)).toFixed(1)
//  const nstRR = parseFloat(msg.readFloatLE(80)).toFixed(1)

//  // Car XYZ
//  // public static float PositionZ(this byte[] bytes) { return GetSingle(bytes, 240 + BufferOffset)
//  const x = parseFloat(msg.readFloatLE(232 + 12)).toFixed(1)
//  const y = parseFloat(msg.readFloatLE(236 + 12)).toFixed(1)
//  const z = parseFloat(msg.readFloatLE(240 + 12)).toFixed(1)
//  const speed = parseInt(msg.readFloatLE(244 + 12))

//  flying = parseFloat(nstFL) + parseFloat(nstFR) + parseFloat(nstRL) + parseFloat(nstRR)

//  if (wipFL + wipFR + wipRL + wipRR === 4) {
//    surface = 2
//  } else if (srFL !== 0 && srFR !== 0 && srRL !== 0 && srRR) {
//    surface = 1
//  } else {
//    surface = 0
//  }

//  if ((parseInt(x) + parseInt(y) + parseInt(z)) === 0.0) { }
