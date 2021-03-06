import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import consola from 'consola'
import { addIOuser, registerUDPuser, removeIOuser } from '../controllers/user'
import { sendInitData } from '../controllers/data'
import config from '../config/auth.config'
dotenv.config()

export const httpServer = http.createServer()
httpServer.listen(process.env.IOPORT || 3001, () => {
  consola.success(`Sockets listening on ${process.env.IOPORT || 3001}`)
})
export const io = new Server(httpServer, {
  rejectUnauthorized: false,
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.URL : process.env.URL + ':' + process.env.PORT,
    methods: ['GET', 'POST'],
    credentials: true
  }
})
// TODO: Check for multiple tabs and only run one for each ip for now
// category=nuxt
io.use(function (socket, next) {
  const authtoken = socket.handshake.headers.cookie
  const token = cookie.parse(authtoken)
  if ('auth._token.local' in token && cookie.parse(authtoken)['auth._token.local'] !== 'false') {
    jwt.verify(token['auth._token.local'].split(' ')[1], config.secret, function (err, decoded) {
      if (err) { return next(new Error('Authentication error')) }
      socket.decoded = decoded
      next()
    })
  } else {
    socket.decoded = false
    next()
  }
}

)
  .on('connection', (socket) => {
    addIOuser(socket)

    socket.on('register/game', (data) => {
      registerUDPuser(data, socket)
    })
    socket.on('room/join', (data) => {
      const d = { ...data.data }
      sendInitData(socket, d)
      // we only need socket to actually join a room on global maps so we hardcode it here the other joins are pseudo just to get init data
      if (d.name === 'm-slug') {
        socket.join(d.slug)
      }
    })
    socket.on('room/leave', (data) => {
      socket.leave(data.data.slug)
    })
    socket.on('disconnect', (reason) => {
      removeIOuser(socket, reason)
    })
  })
