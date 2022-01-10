module.exports = {
  apps: [
    {
      name: 'trakr.app',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ],
  deploy: {
    production: {
      user: 'GREEB',
      host: '159.223.15.204',
      ref: 'origin/main',
      repo: 'git@github.com:GREEB/trakr.app.git',
      path: '/opt/trakr.app',
      'post-deploy': 'yarn build'
    }
  }
}
