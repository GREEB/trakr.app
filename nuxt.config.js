import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s -',
    title: 'trakr.app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: 'black',
    height: '3px'
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh-token', method: 'post' },
          logout: false,
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  },
  serverMiddleware: [
    { path: '/', handler: '~/server/server.js' }
  ],
  server: {
    port: process.env.PORT || 3000
  },
  publicRuntimeConfig: {
    port: process.env.PORT,
    ioPort: process.env.IOPORT,
    baseURL: process.env.BASEURL
  },
  privateRuntimeConfig: {
    port: process.env.PORT,
    ioPort: process.env.IOPORT,
    baseURL: process.env.BASEURL,
    jwtSecret: process.env.JWTSECRET,
    postgresURL: process.env.POSTGRES,
    discordId: process.env.DISCORDID,
    discordSecret: process.env.DISCORDSECRET
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   '~assets/main.sass'
  // ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/eslint-module',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify'
  ],

  modules: [
    'vue-toastification/nuxt',
    'nuxt-socket-io',
    '@nuxtjs/axios'
  ],

  // Toastification module configuration
  toast: {
    position: 'bottom-left',
    hideProgressBar: true,
    timeout: 2194,
    closeOnClick: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    icon: true
  },

  // Nuxt Socket io module configuration
  io: {
    sockets: [
      {
        name: 'main',
        url: process.env.BASEURL || 'http://localhost:' + process.env.IOPORT || 3001,
        default: true,
        vuex: {
          actions: [
            'connect --> CONNECT',
            'disconnect --> DISCONNECT',
            'registerUdp --> UDPREGISTER',
            'chordPack --> FORMAT_CHORDPACK'

          ],
          emitBacks: [
            'sockets/game'
          ]
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three'
    ],
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  }
}
