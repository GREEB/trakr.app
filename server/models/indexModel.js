import { db, Sequelize } from '../config/db.config'
import User from './userModel'
import RefreshToken from './refreshTokenModel'
import Position from './positionModel'
import Udp from './udpModel'

const models = {}
models.db = db
models.sq = Sequelize

models.user = User
models.refreshToken = RefreshToken
models.position = Position
models.udp = Udp

// Client <-> User
models.user.hasOne(models.udp, {
  foreignKey: 'userId',
  tragetKey: 'id'
})
models.udp.belongsTo(models.user, {
  foreignKey: 'userId',
  tragetKey: 'id'
})

// User <-> Pos
models.position.belongsTo(models.user, {
  foreignKey: 'userId',
  tragetKey: 'id'
})
models.user.hasMany(models.position, {
  foreignKey: 'userId',
  tragetKey: 'id'
})

// Auth
models.refreshToken.belongsTo(models.user, {
  foreignKey: 'userId',
  tragetKey: 'id'
})
models.user.hasOne(models.refreshToken, {
  foreignKey: 'userId',
  tragetKey: 'id'
})

export default models
