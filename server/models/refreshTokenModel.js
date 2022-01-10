import { db, Sequelize } from '../config/db.config'

const RefreshToken = db.define('refreshToken', {
  token: {
    type: Sequelize.STRING
  },
  expiryDate: {
    type: Sequelize.DATE
  }
})
export default RefreshToken
