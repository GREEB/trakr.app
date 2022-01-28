import https from 'https'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import consola from 'consola'
import { addIOuser, registerUDPuser, removeIOuser } from '../controllers/userController'
import { sendInitData } from '../controllers/dataController'
import config from '../config/auth.config'
dotenv.config()

export const httpServer = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, (process.env.NODE_ENV === 'production') ? '../../privkey.pem' : '../../localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname, (process.env.NODE_ENV === 'production') ? '../../cert.pem' : '../../localhost.crt')),
  ca: fs.readFileSync(path.resolve(__dirname, (process.env.NODE_ENV === 'production') ? '../../chain.pem' : '../../localhost.crt'))
})

export const io = new Server(httpServer, {
  secure: true,
  transports: ['websocket'],
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.URL : 'https://localhost' + ':' + process.env.PORT,
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
    addIOuser(socket)

    socket.on('register/game', (data) => {
      registerUDPuser(data, socket)
    })
    socket.on('room/join', (data) => {
      socket.join(data.data.slug)
      sendInitData(socket, data.data.slug)
    })
    socket.on('room/home', (data) => {
      sendInitData(socket)
    })
    socket.on('room/leave', (data) => {
      socket.leave(data.data.slug)
    })
    socket.on('disconnect', (reason) => {
      removeIOuser(socket, reason)
    })
  })
httpServer.listen(process.env.IOPORT, () => {
  consola.success(`Sockets listening on ${process.env.IOPORT}`)
})
