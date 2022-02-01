<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-4 mt-4 text-h4">
          Getting Started
        </h1>
        <p class="mb-0">
          <strong>Testing:</strong>
          If you just want to test this, enter the url and port for your game from the list below into the Data out settings. <br>
        </p>
        <p class=" ma-0 pa-0 text-caption">
          Data will apear on <NuxtLink to="/">
            home
          </NuxtLink>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="mt-10">
          <strong class="warning--text"> Saving Data:</strong>

          This only applies if you want to save telemetry to our database
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="mr-3"
          height="100%"
        >
          <v-card-title class="text-h5">
            1. Login
          </v-card-title>

          <v-card-text>Because of limitations we need to authenticate users to be able to moderate bad actors. For now we only support auth over discord oauth. You can still use trakr.app without a login, data will just be passed to you and not saved. </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mr-3"
          height="100%"
        >
          <v-card-title class="text-h5">
            2. Register Client
          </v-card-title>
          <v-card-text>
            Set your games UDP data out to a UDP url from the list below and go to the website on the same IP.
            A button will appear below.
          </v-card-text>
          <v-card-actions>
            <AppBarRegisterClient v-if="udpRegister === 'new'" />

            <v-progress-circular
              v-if="udpRegister !== 'new'"
              :size="20"
              indeterminate
              color="white"
              class="mx-3"
            />
            <span class="ma-2">
              {{ udpRegister !== 'new' ? 'Looking for client' : 'Client found!' }}
            </span>
            <span class=" text-caption grow text-right">Connection logs: <AppBarLogs /></span>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          height="100%"
        >
          <v-card-title class="text-h5">
            3. Enjoy
          </v-card-title>

          <v-card-text>You should be good to go, we will track your clients data and you don't need to be on the website ever again.</v-card-text>

          <v-card-actions>
            <v-btn class="mt-0" text to="/">
              Go home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5 class="text-h5">
          Compatibility list
        </h5>
        <p>For now this is very limited but if you want a game supported consider contributing on github</p>
        <LazyCompatibility />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-caption warning--text">
          This is work in progress and you may find bugs, please consider contributing to this project.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head: {
    title: 'Hello'
  },
  computed: {
    udpConnected () { return this.$store.state.udp.connected },
    udpRegister () {
      return this.$store.state.udp.register
    }
  }
  // watch: {
  //   udpConnected (val) {
  //     if (val) {
  //       this.$toast.success('UDP client connected')
  //     } else {
  //       this.$toast.error('UDP client disconnected')
  //     }
  //   }
  // }
}
</script>
<style lang="sass" scoped>
.v-card
  height: fit-content
.v-container
  height: 100%
  background: #121212
  z-index: 1
  position: relative
</style>
