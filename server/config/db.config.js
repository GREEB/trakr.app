import Sequelize from 'sequelize'

const db = new Sequelize(process.env.POSTGRES, { logging: false })

export { db, Sequelize }
