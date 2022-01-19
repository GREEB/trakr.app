<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="300px"
  >
    <v-card v-if="$auth.loggedIn">
      <v-alert :value="alert" type="error">
        {{ alertText }}
      </v-alert>
      <v-card-title>Register Client</v-card-title>
      <v-card-subtitle>
        {{ text }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <v-radio-group
          v-model="dialogm1"
          column
        >
          <v-radio
            label="Forza Horizon 5"
            value="1"
          />
        </v-radio-group>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-else
      elevation="2"
    >
      <v-card-title>Register Client</v-card-title>
      <v-card-subtitle>We have detected unregistred UDP data</v-card-subtitle>
      <v-card-text>Unfortunately an authentificatoin is required for us to save data this is to prevent bad actors, you can still use the site the data won't be saved.</v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          v-if="!$auth.loggedIn"
          type="submit"
          color="blue darken-1"
          text
          class="ma-2 white--text"
          :href="oauth"
          @click="save"
        >
          Login
          <v-icon
            right
            dark
          >
            mdi-discord
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import games from '~/games.json'
export default {
  data () {
    return {
      text: 'We have detected unregistred UDP data',
      alert: false,
      alertText: '',
      dialogm1: '',
      dialog: false,
      oauth: 'https://discord.com/api/oauth2/authorize?client_id=918603750057328640&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20email'

    }
  },
  // mounted () {
  //   console.log('mounted')
  //   this.socket = this.$nuxtSocket({ channel: '/index', withCredentials: true })
  //   /* Listen for events: */
  //   this.socket
  //     .on('udpClient', (msg, cb) => {
  //       console.log(msg)
  //     /* Handle event */
  //     })
  // },
  computed: {
    udpNew () {
      return this.$store.state.udpNew
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    }
  },
  watch: {
    udpNew (state) {
      if (state) {
        this.dialog = true
      }
    }
  },
  mounted () {
    console.log(games)
  },
  methods: {
    save () {
      if (this.dialogm1 === '') {
        // empty has to choose
        this.alert = true
        this.alertText = 'You need to choose one'
      } else {
        // change vuex value that sends back data
        this.$store.commit('sockets/game', this.dialogm1)
        this.dialog = false
      }
      // this.dialog = fals∂e
    }
  }
}
</script>
