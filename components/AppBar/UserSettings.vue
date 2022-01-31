<template>
  <v-card offset-x="true">
    <v-card-title>User Settings</v-card-title>
    <v-card-actions>
      <v-btn
        block
        outlined
        color="error"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
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
  },
  methods: {
    // FIXME: Logout does not trigger anything in the backend so user is kinda bugged out cuz sockets still authed
    // category=nuxt
    async logout () {
      await this.$auth.logout()
    }

  }
}
</script>
