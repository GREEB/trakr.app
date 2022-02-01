import colors from 'vuetify/es5/util/colors'
import pkg from './package.json'

export default {
  head: {
    titleTemplate: '%s - Trakr.app',
    title: 'Trakr.app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Track car telemetry in 3d space' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'keywords', name: 'keywords', content: 'track, telemetry, 3D, data out, simulation, racing' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: 'gray',
    height: '3px'
  },
  auth: {
    cookie: {
      options: {
        sameSite: 'lax'
      }
    },
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
  /**
   * TODO: Fix server middleware loading before frontend and breaking on hot reload in dev
   * category=nuxt
   */
  serverMiddleware: [
    { path: '/', handler: '~/server/server.js' }
  ],
  server: {
    host: process.env.URL ? '0' : 'localhost',
    port: process.env.PORT || 3000
  },
  publicRuntimeConfig: {
    port: process.env.PORT,
    ioPort: process.env.IOPORT,
    baseURL: process.env.URL,
    discordId: process.env.DISCORDID,
    githubURL: process.env.DISCORDID,
    version: process.env.VERSION || pkg.version + 'dev'
  },
  privateRuntimeConfig: {
    port: process.env.PORT,
    ioPort: process.env.IOPORT,
    baseURL: process.env.URL,
    jwtSecret: process.env.JWTSECRET,
    postgresURL: process.env.POSTGRES,
    discordId: process.env.DISCORDID,
    discordSecret: process.env.DISCORDSECRET
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/main.sass',
    '~assets/css/animations.sass'
  ],
  plugins: [
    '~/plugins/vuescroll',
    '~/plugins/three.client'

  ],
  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify'
  ],
  modules: [
    ['nuxt-social-meta',
      {
        url: 'https://trakr.app',
        title: 'Trakr.app',
        site_name: 'Trakr.app',
        description: 'Track car telemetry in 3D space',
        img: 'https://trakr.app/social.png',
        img_size: { width: '1200', height: '630' },
        locale: 'en_US',
        twitter: '@tr4krapp',
        twitter_card: 'summary_large_image',
        theme_color: '#724ade'
      }
    ],

    ['nuxt-highlightjs', {
      style: 'night-owl'
    }],
    '@nuxt/content',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    'nuxt-socket-io'
  ],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },
  // Toastification module configuration
  toast: {
    cssFile: '~/assets/css/noti.scss',
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
        // Set localhost with port, on prod we do that with nginx so just pass URL
        url: process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost' + ':' + process.env.IOPORT,
        default: true,
        vuex: {
          actions: [
            'chordPack --> FORMAT_CHORDPACK',
            'connect --> CONNECT',
            'disconnect --> DISCONNECT',
            'udpRegister --> UDPREGISTER',
            'udpConnect --> UDPCONNECT',
            'udpDisconnect --> UDPDISCONNECT',
            'E404 --> E404'
          ],
          emitBacks: [
            'register/game',
            'room/join',
            'room/leave',
            'room/home'
          ]
        }
      }
    ]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: '#8e2eff',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          bg: colors.green.accent3,
          text: '#ffffff'
        },
        light: {
          primary: colors.blue.darken2,
          accent: '#8e2eff',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          bg: colors.blue.accent3,
          text: '#000000'
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['three'],
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
