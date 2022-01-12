module.exports = {
  apps: [
    {
      name: 'trakr.app',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ]
}
