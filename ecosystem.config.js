require('dotenv').config()
module.exports = {
  apps: [
    {
      name: 'trakr',
      script: 'yarn',
      args: 'start'
    }
  ]
}
