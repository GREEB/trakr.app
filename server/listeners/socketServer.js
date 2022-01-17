import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { addIOuser, registerUDPUser } from '../controllers/userController'
import { sendInitData } from '../controllers/dataController'
import config from '../config/auth.config'

dotenv.config()

export const httpServer = http.createServer()
httpServer.listen(process.env.IOPORT, () => {
  console.log(`Socket listening on ${process.env.IOPORT}`)
})
// const io = new Server()
// server-side
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL || 'http://localhost:' + process.env.PORT || 3000,
    methods: ['GET', 'POST'],
    credentials: true
  }
})
io.use(function (socket, next) {
  // TODO: No idea if this is right way to do things or if we need to recheck this everytime with middleware
  // category=Auth
  const authtoken = socket.handshake.headers.cookie
  console.log(cookie.parse(authtoken))

  const token = cookie.parse(authtoken)['auth._token.local'].split(' ')[1]
  if (cookie.parse(authtoken)['auth._token.local'] === 'false') {
    socket.decoded = false
    next()
  } else {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) { return next(new Error('Authentication error')) }
      socket.decoded = decoded
      next()
    })
  }
}).on('connection', (socket) => {
  console.log('CONNECTED SOCKET')
  if (socket.handshake.headers.path === '/') {
    socket.join('home')
  }
  addIOuser(socket)
  sendInitData(socket)
  socket.on('sockets/game', (data) => {
    registerUDPUser(data, socket)
  })
})
