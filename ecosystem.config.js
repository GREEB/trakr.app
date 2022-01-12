module.exports = {
  apps: [
    {
      name: 'trakr.app',
      script: './node_modules/nuxt/bin/nuxt.js',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      args: 'NODE_ENV=production start'
    }
  ]
}
