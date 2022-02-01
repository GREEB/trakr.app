<template>
  <v-app dark>
    <v-main>
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
      >
        <AppBarMenu />
      </v-navigation-drawer>
      <v-app-bar
        app
        dense
      >
        <v-app-bar-nav-icon class="d-sm-none" @click="drawer = !drawer" />
        <AppBarLogo />
        <NuxtLink to="/" class="adaptiveText text-decoration-none">
          <v-toolbar-title v-text="title" />
        </NuxtLink>
        <AppBarMenu class="d-none d-sm-flex" />
        <v-spacer />
        <AppBarLogs />
        <AppBarSettings />
        <AppBarLogin v-if="showLogin()" />
      </v-app-bar>
      <div class="stage" />
      <Gui />
      <Nuxt />
      <CookieConsent />
      <NuxtLink class="pa-0 ma-0 version text-decoration-none" to="/changelog">
        <v-subheader class="pa-0 ma-0">
          v.{{ $config.version }}
        </v-subheader>
      </NuxtLink>
    </v-main>
  </v-app>
</template>
<script>
import sockets from '../mixin/sockets'
import error from '../mixin/error'
export default {
  mixins: [sockets, error],
  data: () => ({
    title: 'trakr.app',
    drawer: null,
    ops: {
      bar: {
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: '#151515 ',
        opacity: 1,
        minSize: 0,
        size: '6px'
      }
    }
  }),
  computed: {
    udpConnected () { return this.$store.state.udp.connected }

  },
  watch: {
    udpConnected (val) {
      if (val) {
        this.$toast.info('UDP client connected')
      } else {
        this.$toast.error('UDP client disconnected')
      }
    }
  },
  // not sure if needed but first thing we call is theme
  created () {
    const theme = this.$cookies.get('theme')
    if (theme) {
      // 0 delay fixes elements getting loaded before this? not sure js...
      setTimeout(() => {
        if (theme === 'dark') {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
      }, 0)
    }
  },
  mounted () {
    // Style lil gui after mount...
    const theme = this.$cookies.get('theme')
    if (theme && document.getElementsByClassName('lil-gui root')[0] !== undefined) {
      if (theme === 'dark') {
        this.$stage.setBackgroundColor('#121212')
        document.getElementsByClassName('lil-gui root')[0].classList.remove('light')
      } else {
        document.getElementsByClassName('lil-gui root')[0].classList.add('light')
        this.$stage.setBackgroundColor('#ffffff')
      }
    }
  },
  methods: {
    showLogin () {
      if (this.$route.name === 'register') {
        if (this.$auth.loggedIn) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.version
  position: absolute
  bottom: 0
  right: 0
  div
    height: unset
    font-size: 9px
.lil-gui .title
  font-size: 1em !important
  line-height: 1.7em
</style>
