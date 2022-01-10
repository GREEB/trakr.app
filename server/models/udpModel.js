import { db, Sequelize } from '../config/db.config'

const Udp = db.define('udp', {
  mid: Sequelize.STRING,
  game: Sequelize.STRING
})

export default Udp
