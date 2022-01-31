import fs from 'fs'
import { users, maxClientTimeout, removeUDPuser } from '../controllers/userController'

export const sessionWatcher = () => {
  setInterval(() => {
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error(err)
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
  }, 500)
}

export const age = (obj) => { return (Date.now() - obj.udp.lastSeen) / 1000 }
export const lastSeen = (obj) => { obj.udp.lastSeen = Date.now() }
export const lastSaved = (obj) => { obj.lastSaved = Date.now() }
