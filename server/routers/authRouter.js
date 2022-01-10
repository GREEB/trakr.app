import { Router } from 'express'
import { postLogin, postRefreshToken, getUser } from '../controllers/authController.js'

export default function (app) {
  const authRouter = Router()

  authRouter.post('/login', postLogin)
  authRouter.post('/refresh-token', postRefreshToken)

  authRouter.get('/user', getUser)

  app.use('/api/auth/', authRouter)
}
