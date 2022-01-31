import { db, Sequelize } from '../config/db.config'

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  did: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  avatar: Sequelize.STRING
})

export default User
