<template>
  <v-dialog
    v-model="dialog"
    max-width="fit-content"
  >
    <v-card v-if="$auth.loggedIn" tile>
      <v-toolbar
        flat
        dark
        color="accent"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          We've detected an unregistered client
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-alert
          v-model="validateAlert"
          dense
          outlined
          type="error"
          class="ma-5"
        >
          Fill out form
        </v-alert>
        <v-row>
          <v-form>
            <v-col>
              <v-list
                flat
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Confirm
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Help us make sure you are sending the right data to the right url
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-group
                  v-model="settings.confirm"
                >
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Game: Forza Horizon 5</v-list-item-title>
                        <v-list-item-subtitle>Make sure you are sending data from this game</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col>
              <v-list flat>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Usage
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Help us categorize how you play
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-group
                  v-model="settings.usage"
                >
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Racer</v-list-item-title>
                        <v-list-item-subtitle>I only Race, <strong>no modding/cheating</strong></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Casual</v-list-item-title>
                        <v-list-item-subtitle>I Race and do just casual driving, <strong>no modding/cheating</strong></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Modder</v-list-item-title>
                        <v-list-item-subtitle>I do use mods and will be flying around</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col>
              <v-list flat>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Visibility / Contributing
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Choose visibility/contribution
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-group
                  v-model="settings.visibility"
                >
                  <v-list-item :disabled="modding">
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :disabled="modding" :value="modding ? false : active" :input-value="active" />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Share</v-list-item-title>
                        <v-list-item-subtitle>Use my data for Maps <strong>no modding/cheating</strong></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :value="modding ? true : active" :input-value="modding ? true : active" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Hide</v-list-item-title>
                        <v-list-item-subtitle>No data will be shared</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-form>
        </v-row>
      </v-card-text>
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
        <AppBarLogin />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      settings: {
        visibility: null,
        usage: null,
        confirm: null
      },
      validateAlert: false,
      dialog: false
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
    modding () {
      if (this.settings.usage === 2) {
        return true
      } else {
        return false
      }
    },
    udpNew () {
      return this.$store.state.udpNew
    }
  },
  watch: {
    settings (val) {
      console.log(val)
    },
    udpNew (state) {
      if (state) {
        this.dialog = true
      }
    }
  },
  methods: {
    save () {
      if (this.settings.confirm !== 1) {
        this.validateAlert = true
      }
      // if (this.dialogm1 === '') {
      //   // empty has to choose
      //   this.alert = true
      //   this.alertText = 'You need to choose one'
      // } else {
      //   // change vuex value that sends back data
      //   this.$store.commit('sockets/game', this.dialogm1)
      //   this.dialog = false
      // }
      // this.dialog = fals∂e
    }
  }
}
</script>
