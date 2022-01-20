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
      user: 'root',
      host: [process.env.BOXIP],
      ref: 'origin/master',
      repo: 'git@github.com:GREEB/trakr.app.git',
      path: '/opt/trakr.app',
      key: '~/.ssh/id_rsa.pem',
      'post-deploy': 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
