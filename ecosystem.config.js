/* eslint-disable quote-props */
require('dotenv').config()
module.exports = {
  apps: [
    {
      name: 'nuxtjs',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      'user': 'root',
      'host': [process.env.BOXIP],
      'ref': 'origin/master',
      'repo': 'git@github.com:GREEB/trakr.app.git',
      'ssh_options': ['ForwardAgent=yes'],
      'path': '/opt/trakr.app',
      'post-deploy': 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
