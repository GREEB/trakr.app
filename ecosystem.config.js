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
      }
    }
  ]
}
