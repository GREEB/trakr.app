import dotenv from 'dotenv'
import express from 'express'
import consola from 'consola'
import authRouter from './routers/authRouter'
import { db } from './config/db.config'
import { makeServers } from './listeners/udpServer'

const wait4sync = async () => {
  await db.sync()
}
wait4sync()

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.json())
authRouter(app)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL || 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

makeServers()

app.listen(3002, () => {
  consola.success('API listening on 3002')
})

export default app
