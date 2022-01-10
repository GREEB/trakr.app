import { db, Sequelize } from '../config/db.config'

const Game = db.define('game', {
  name: Sequelize.STRING
})

export default Game
