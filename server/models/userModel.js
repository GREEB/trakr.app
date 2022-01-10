import { db, Sequelize } from '../config/db.config'

const User = db.define('user', {
  did: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  avatar: Sequelize.STRING
})

export default User
