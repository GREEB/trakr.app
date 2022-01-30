import tx2 from 'tx2'
import { users } from '../controllers/userController'
tx2.metric({
  name: 'Realtime user',
  value () {
    return users !== undefined ? Object.keys(users).length : 0
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
