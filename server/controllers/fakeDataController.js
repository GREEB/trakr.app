// Send fake data
// Create fake data
import io from '../server.js'
let fakeChords = []
const createFakeData = () => {
  fakeChords = []

  for (let index = 0; index < 1000; index++) {
    const x = Math.random() * 2 * index
    const y = Math.random() * 2 * index
    const z = Math.random() * 2 * index
    const s = 0
    fakeChords.push({
      x: index * x,
      y: index * y,
      z: index * z,
      s
    })
  }
  sendFakeDataInterval()
}

// io.sockets.on('connection', (socket) => {
//   socket.emit('chordPack', fakeChords)

// })
let index = 0
const sendFakeDataInterval = () => {
  const interval = setInterval(() => {
    if (index === 1000) {
      clearInterval(interval)
      fakeData()
      index = 0
    } else {
      // console.log('sending', fakeChords[index]);
      io.emit('chord', fakeChords[index])
      index++
    }
  }, 500)
}

const fakeData = () => {
  createFakeData()
}

export { fakeData }
