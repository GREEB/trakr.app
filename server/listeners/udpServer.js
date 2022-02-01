import dgram from 'dgram'
import consola from 'consola'
import tx2 from 'tx2'
import { makeUDPuser } from '../controllers/userController'
import { throttledWrite } from '../controllers/dataController' // udp6 for ipv6 support
import { games } from '../../assets/js/games' // ewww path

const servers = {}

export function makeServers () {
  if (Object.keys(servers).length !== 0) { return }
  Object.entries(games).forEach(
    ([gameIdString, game]) => {
      const gameId = parseInt(gameIdString)
      const meter = tx2.meter({
        name: 'udp for game:' + gameId + ' inc req/sec',
        samples: 1,
        timeframe: 60
      })
      servers[gameId] = dgram.createSocket('udp6')
      servers[gameId].on('message', (msg, rinfo) => {
        servers[gameId].setRecvBufferSize(100000000)
        meter.mark()
        if (rinfo !== undefined) {
          makeUDPuser(rinfo.address, gameId)
          throttledWrite(msg, rinfo, gameId)
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
