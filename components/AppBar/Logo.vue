<template>
  <div>
    <NuxtLink class="tb-icon" to="/">
      <v-tooltip v-model="showConnectionTooltip" bottom color="rgba(0, 0, 0,0.1)">
        <template #activator="{ on, attrs }">
          <v-img
            max-height="40"
            max-width="30"
            v-bind="attrs"
            class="logo"
            src="image/logo512.png"
            :class="connected && onlineClass"
            v-on="on"
          />
        </template>
        <span class="connectionTooltip">
          <span class="ml-2" :class="connected && 'connected'">Sockets</span><br>
          <span class="ml-2" :class="isAuthenticated && 'connected'">Auth</span>
        </span>
      </v-tooltip>
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
    connected () {
      return this.$store.state.connected
    }
  }
}
</script>
<style lang="sass" scoped>
.connectionTooltip
  span
    &::before
      content: ""
      height: 8px
      width: 8px
      border-radius: 100%
      background-color: #dd2c00
      position: absolute
      margin-left: -16px
      margin-top: 7px
.connectionTooltip
  .connected
      &::before
        background-color: #00e676

// .about.theme--dark.v-btn--active:hover::before, .about.theme--dark.v-btn--active::before
//     opacity: 0
.tb-icon
  font-weight: 600
  text-decoration: none
  color: #fff
.logo
    transition: all 2s ease
    filter: grayscale(1)
    margin-top: 0.3em
.logo
  height: 30px
.online
  filter: grayscale(0)
</style>
