<template>
  <v-app-bar
    app
    dense
  >
    <v-app-bar-nav-icon />

    <AppBarLogo />
    <NuxtLink to="/" class="adaptiveText text-decoration-none">
      <v-toolbar-title v-text="title" />
    </NuxtLink>
    <AppBarMenu />
    <v-spacer />

    <AppBarSettings />
    <AppBarLogin v-if="showLogin" />
  </v-app-bar>
</template>
<script>

export default {
  data: () => ({
    title: 'trakr.app'
  }),
  computed: {
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
<style scoped>
.logoText{
  text-decoration: none;
}
</style>
