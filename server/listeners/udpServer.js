import dgram from 'dgram'
import { makeUDPuser } from '../controllers/userController'
import { throttledWrite } from '../controllers/dataController'
const udpServer = dgram.createSocket('udp4')

udpServer.on('message', (msg, rinfo) => {
  if (rinfo !== undefined) {
    makeUDPuser(rinfo.address)
  }

  let flying = 1
  let surface = 0
  // Road edgde detection build in?
  // WheelOnRumbleStripFl(this byte[] bytes) { return GetSingle(bytes, 116)
  const yaw = parseFloat(msg.readFloatLE(56))
  const pitch = parseFloat(msg.readFloatLE(60))
  const roll = parseFloat(msg.readFloatLE(64))

  // public static float Speed(this byte[] bytes) { return GetSingle(bytes, 244 + BufferOffset); }
  // Get Dirt tele to see if not on real road
  // SurfaceRumbleRr(this byte[] bytes) { return GetSingle(bytes, 160)
  const srFL = parseFloat(msg.readFloatLE(148))
  const srFR = parseFloat(msg.readFloatLE(152))
  const srRL = parseFloat(msg.readFloatLE(156))
  const srRR = parseFloat(msg.readFloatLE(160))

  // If all 4 Wheels are in a puddle add as water point
  // public static float WheelInPuddleRr(this byte[] bytes) { return GetSingle(bytes, 144)
  const wipFL = parseInt(msg.readFloatLE(132), 10)
  const wipFR = parseInt(msg.readFloatLE(136), 10)
  const wipRL = parseInt(msg.readFloatLE(140), 10)
  const wipRR = parseInt(msg.readFloatLE(144), 10)

  // Get suspension to check if wheel in the air?
  // public static float NormSuspensionTravelRr(this byte[] bytes) { return GetSingle(bytes, 80)
  const nstFL = parseFloat(msg.readFloatLE(68)).toFixed(1)
  const nstFR = parseFloat(msg.readFloatLE(72)).toFixed(1)
  const nstRL = parseFloat(msg.readFloatLE(76)).toFixed(1)
  const nstRR = parseFloat(msg.readFloatLE(80)).toFixed(1)

  // Car XYZ
  // public static float PositionZ(this byte[] bytes) { return GetSingle(bytes, 240 + BufferOffset)

  const x = parseFloat(msg.readFloatLE(232 + 12)).toFixed(1)
  const y = parseFloat(msg.readFloatLE(236 + 12)).toFixed(1)
  const z = parseFloat(msg.readFloatLE(240 + 12)).toFixed(1)
  const speed = parseInt(msg.readFloatLE(244 + 12))

  flying = parseFloat(nstFL) + parseFloat(nstFR) + parseFloat(nstRL) + parseFloat(nstRR)

  if (wipFL + wipFR + wipRL + wipRR === 4) {
    surface = 2
  } else if (srFL !== 0 && srFR !== 0 && srRL !== 0 && srRR) {
    surface = 1
  } else {
    surface = 0
  }

  if ((parseInt(x) + parseInt(y) + parseInt(z)) === 0.0) { return }
  throttledWrite(x, y, z, speed, surface, flying, yaw, pitch, roll, rinfo.address, rinfo.size)
})

udpServer.on('error', (err) => {
  console.log(`udpServer error:\n${err.stack}`)
  udpServer.close()
})

udpServer.on('close', (err) => {
  console.log(`udpServer error:\n${err}`)
})

export default udpServer
