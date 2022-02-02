import fs from 'fs'
import consola from 'consola'
import { users, maxClientTimeout, removeUDPuser } from '../controllers/user'

export const sessionWatcher = () => {
  setInterval(() => {
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      if (err) {
        consola.error(err)
      }
      // file written successfully
    })
    Object.keys(users).forEach((id) => {
      if ('udp' in users[id]) {
        if (users[id].udp.lastSeen !== null && age(users[id]) > maxClientTimeout) {
          removeUDPuser(id)
        }
      }
    })
  }, 1000)
}

export const age = (obj) => { return (Date.now() - obj.udp.lastSeen) / 1000 }
export const lastSeen = (obj) => { obj.udp.lastSeen = Date.now() }
export const lastSaved = (obj) => { obj.lastSaved = Date.now() }
