import { db, Sequelize } from '../config/db.config'

const Udp = db.define('udp', {
  mid: Sequelize.BIGINT,
  game: Sequelize.INTEGER,
  usage: Sequelize.INTEGER,
  mode: Sequelize.INTEGER,
  visibility: Sequelize.INTEGER
})

export default Udp
