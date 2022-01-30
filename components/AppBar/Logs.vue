<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        dark
        v-bind="attrs"
        icon
        small
        v-on="on"
      >
        <v-icon x-small>
          mdi-wifi
        </v-icon>
      </v-btn>
    </template>
    <v-card offset-x="true" color="accent">
      <v-app-bar
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 white--text pl-0">
          Connection
        </v-toolbar-title>

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              small
              :outlined="IOconnected"
              class="mx-3"
              :color="IOconnected ? 'success lighten-2' : 'accent lighten-2'"
              v-on="on"
            >
              Socket.io
            </v-chip>
          </template>
          <span>{{ IOconnected ? 'Realtime connection established to trakr.app' : 'Not connected to trakr.app sockets' }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              small
              class="mr-3"

              :outlined="IOconnected"
              :color="udpConnected ? 'success lighten-2' : 'accent lighten-2'"
              v-on="on"
            >
              Game
            </v-chip>
          </template>
          <span>{{ udpConnected ? 'Client connected' : 'no UDP client found with your IP' }}</span>
        </v-tooltip>
      </v-app-bar>
      <v-card-text>
        <pre>
        <code v-highlight="connectionLog.join('')" class="logs" />
    </pre>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    logs: '',
    menu: false
  }),
  computed: {
    connectionLog () { return this.$store.state.connectionLog },
    IOconnected () { return this.$store.state.sio.connected },
    udpConnected () { return this.$store.state.udp.connected }

  },
  watch: {
    connectionLog (val) {
      if (val.length === 0) {
        this.logs = 'empty logs'
      } else {
        this.logs = val.join('')
      }
    }
  }
}
</script>
