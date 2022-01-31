const pkg = require('./package.json')
require('dotenv').config()
module.exports = {
  apps: [
    {
      name: 'trakr',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        VERSION: pkg.version
      },
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ]
}
