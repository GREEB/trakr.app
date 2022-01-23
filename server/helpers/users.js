import consola from 'consola'
import { users, maxClientTimeout, watchedObject } from '../controllers/userController'
import { age } from '../helpers/defaults.js'
import { io } from '../listeners/socketServer'

export const sessionWatcher = () => {
  setInterval(() => {
    Object.keys(users).forEach((id) => {
      if ('udp' in users[id]) {
        if (age(users[id]) > maxClientTimeout) {
          consola.info(`deleting UDP ${id}`)

          if ('socket' in users[id]) { // send disconnect ping
            io.to(users[id].socket.id).emit('udpDisconnect')
          }
          delete watchedObject[users[id].udp.ip]
          delete users[id].udp
        }
      }
    })
  }, 1000)
}

export const lastSeen = (obj) => { obj.udp.lastSeen = Date.now() }
