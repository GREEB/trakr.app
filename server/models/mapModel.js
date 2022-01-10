import { db, Sequelize } from '../config/db.config'

const Map = db.define('map', {
  name: Sequelize.STRING,
  count: Sequelize.INTEGER,
  minX: Sequelize.FLOAT,
  maxX: Sequelize.FLOAT,
  minY: Sequelize.FLOAT,
  maxY: Sequelize.FLOAT,
  maxZ: Sequelize.FLOAT,
  minZ: Sequelize.FLOAT
})

export default Map
