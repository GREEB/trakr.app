<template>
  <div>
    <NuxtLink class="tb-icon" to="/">
      <img
        class="logo mr-3"
        style="width: 25px; height: 25px;"
        src="image/logo.png"
      >
    </NuxtLink>
  </div>
</template>
<script>
export default {
  data: () => ({
    onlineClass: 'online',

    showConnectionTooltip: null
  }),
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    IOconnected () {
      return this.$store.state.connected
    },
    udpConnected () {
      return this.$store.state.udp.connected
    }
  }
}
</script>
<style lang="sass" scoped>
// .about.theme--dark.v-btn--active:hover::before, .about.theme--dark.v-btn--active::before
//     opacity: 0
.tb-icon
  font-weight: 600
  text-decoration: none
.logo
    transition: all 2s ease
    margin-top: 0.3em
.logo
  height: 30px
</style>
