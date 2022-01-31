import tx2 from 'tx2'
import { users } from '../controllers/userController'
tx2.metric({
  name: 'io users',
  value () {
    let io = 0
    Object.keys(users).forEach((id) => {
      if ('socket' in users[id]) {
        io++
      }
    })
    return io
  }
})
tx2.metric({
  name: 'udp users',
  value () {
    let udp = 0
    Object.keys(users).forEach((id) => {
      if ('udp' in users[id]) {
        udp++
      }
    })
    return udp
  }
})
export default {
  ioOut: tx2.meter({
    name: 'sending io out /sec',
    samples: 1,
    timeframe: 60
  }),
  data2db: tx2.meter({
    name: 'saving data /sec',
    samples: 1,
    timeframe: 60
  })
}
