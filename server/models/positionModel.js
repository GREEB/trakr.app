import { db, Sequelize } from '../config/db.config'

const Position = db.define('position', {
  x: Sequelize.FLOAT,
  y: Sequelize.FLOAT,
  z: Sequelize.FLOAT,
  r: Sequelize.INTEGER
}, {
  timestamps: false
})

export default Position
