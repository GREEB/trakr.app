import { db, Sequelize } from '../config/db.config'

const Position = db.define('position', {
  raw: Sequelize.BLOB
}, {
  timestamps: false
})

export default Position
