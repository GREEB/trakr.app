import { db, Sequelize } from '../config/db.config'

const Udp = db.define('udp', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  mid: Sequelize.STRING,
  game: Sequelize.INTEGER,
  usage: Sequelize.INTEGER,
  mode: Sequelize.INTEGER,
  visibility: Sequelize.INTEGER
})

export default Udp
