require('dotenv').config()
module.exports = {
  development: {
    use_env_variable: 'POSTGRES',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES',
    dialect: 'postgres',
    logging: false
  }
}
