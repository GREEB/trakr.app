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
        <AppBarSettings />
        <AppBarLogin v-if="showLogin()" />
      </v-app-bar>
      <div class="stage" />
      <Gui />
      <Nuxt />
    </v-main>
    <!-- Inject sockets into the template maybe not the best way? -->
  </v-app>
</template>
<script>
import sockets from '../mixin/sockets'
export default {
  mixins: [sockets],
  data: () => ({
    title: 'trakr.app',
    drawer: null
  }),
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
<style>

.lil-gui .title{
 font-size: 1em !important;
 line-height: 1.7em;
}
</style>
