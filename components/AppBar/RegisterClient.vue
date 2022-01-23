<template>
  <div v-if="(udpRegister === 'new')">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          class="mx-1"
          dark
          icon
          small
          color="accent"
          to="/register"
          v-on="on"
        >
          <v-icon
            :color="udpRegister ? 'warning': 'accent'"
            :class="udpRegister ? 'pulse' : ''"
            @click="show = true"
          >
            {{ udpRegister ? 'mdi-car-light-high' : 'mdi-car-light-dimmed' }}
          </v-icon>
        </v-btn>
      </template>
      <span>Register new Client</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false
  }),
  computed: {
    udpRegister () {
      return this.$store.state.udp.register
    },
    udpConnected () {
      return this.$store.state.udp.connected
    }
  },
  watch: {
    udpConnected (val) {
      if (val) {
        this.$toast.success('UDP client connected')
      } else {
        this.$toast.error('UDP client disconnected')
      }
    }
  }

}
</script>
<style scoped>

</style>
