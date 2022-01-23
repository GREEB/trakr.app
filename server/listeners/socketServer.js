import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import consola from 'consola'
import { addIOuser, registerUDPuser, removeIOuser } from '../controllers/userController'
import { sendInitData } from '../controllers/dataController'
import config from '../config/auth.config'
dotenv.config()

export const httpServer = http.createServer()
httpServer.listen(process.env.IOPORT, () => {
  consola.success(`Sockets listening on ${process.env.IOPORT}`)
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
  const authtoken = socket.handshake.headers.cookie
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
})
  .on('connection', (socket) => {
    if (socket.handshake.headers.path === '/') {
      socket.join('home')
    }
    // if user on eg /m/fh5 send global data for fh5 and add to fh5 room do that for every game we support
    // Adding user to our dumb user manager
    addIOuser(socket)

    // Send init data to user
    // sendInitData(socket)
    // Register Client Call
    socket.on('sockets/game', (data) => {
      registerUDPuser(data, socket)
    })

    // when sockets disconnects
    socket.on('disconnect', (reason) => {
      // socket disconnect remove it from users
      removeIOuser(socket, reason)
    })
  })
