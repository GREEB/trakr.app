<template>
  <div class="fhContainer d-flex justify-center">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="8"
        >
          <h1 class="text-h4 mt-5 mb-2">
            Register UDP client
          </h1>
          <p>
            {{ $auth.loggedIn ? "We've detected a client on your IP sending us UDP data" : "Unfortunately an authentication is required for us to save data this is to prevent bad actors, you can still use the site the data won't be saved" }}
          </p>
        </v-col>
        <v-col class="d-flex justify-end  align-center ">
          <v-btn
            v-if="$auth.loggedIn"
            x-large
            :disabled="(settings.confirm === undefined || settings.usage === undefined || settings.visibility === undefined || settings.mode === undefined)"
            :class="(settings.confirm === undefined || settings.usage === undefined || settings.visibility === undefined || settings.mode === undefined) ? 'error--text darken-2' : 'success--text darken-2' + 'text-h5'"
            @click="save()"
          >
            Save
          </v-btn>
          <AppBarLogin v-else />
        </v-col>
      </v-row>

      <v-row class="mb-5" :style="!$auth.loggedIn ? 'opacity: 0.5' : 'opacity: 1'">
        <v-col>
          <v-card
            elevation="5"
          >
            <v-card-title
              :class="(settings.confirm === undefined) ? 'error--text darken-2' : 'success--text darken-2' + 'text-h5'"

              class="text-h5"
            >
              Confirm
            </v-card-title>

            <v-card-subtitle>
              Help us make sure you are sending the right data to the right url
            </v-card-subtitle>
            <v-list-item-group
              v-model="settings.confirm"
            >
              <v-list-item :disabled="!$auth.loggedIn">
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox color="white" :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Game: {{ games[udpGame.game].gameName }}</v-list-item-title>
                    <v-list-item-subtitle>Make sure you are sending data from this game</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
            <v-card-actions>
              <WrongGame :settings-data="(settings.confirm !== undefined)" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            elevation="5"
          >
            <v-card-title
              class="text-h5"

              :class="(settings.usage === undefined) ? 'error--text darken-2' : 'success--text darken-2' + 'text-h5'"
            >
              Usage
            </v-card-title>
            <v-card-subtitle>
              Help us categorize how you play
            </v-card-subtitle>
            <v-list-item-group
              v-model="settings.usage"
            >
              <v-list-item :disabled="!$auth.loggedIn">
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
              <v-list-item :disabled="!$auth.loggedIn">
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
              <v-list-item :disabled="!$auth.loggedIn">
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
          </v-card>
        </v-col>
        <v-col>
          <v-card
            elevation="5"
          >
            <v-card-title
              class="text-h5"
              :class="(settings.visibility === undefined) ? 'error--text darken-2' : 'success--text darken-2' + 'text-h5'"
            >
              Visibility / Contributing
            </v-card-title>
            <v-card-subtitle>
              Choose visibility/contribution we would like to encourage everyone to share
            </v-card-subtitle>
            <v-list-item-group
              v-model="settings.visibility"
            >
              <v-list-item :disabled="modding || !$auth.loggedIn">
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
              <v-list-item :disabled="modding || !$auth.loggedIn">
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :disabled="modding" :value="modding ? true : active" :input-value="modding ? true : active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Hide</v-list-item-title>
                    <v-list-item-subtitle>No data will be shared</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            elevation="5"
          >
            <v-card-title
              class="text-h5"
              :class="(settings.mode === undefined) ? 'error--text darken-2' : 'success--text darken-2' + 'text-h5'"
            >
              Mode
            </v-card-title>
            <v-card-subtitle>
              For now we only support mapping
            </v-card-subtitle>
            <v-list-item-group
              v-model="settings.mode"
            >
              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Mapping</v-list-item-title>
                    <v-list-item-subtitle>We only save xyz data (maybe surface rumble) </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-list-item disabled>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox disabled :input-value="active" />
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Light</v-list-item-title>
                    <v-list-item-subtitle>Choose from a few parameters of your telemetry for saving (max x bytes) </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-list-item disabled>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox disabled :input-value="active" />
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Raw</v-list-item-title>
                    <v-list-item-subtitle>We save every byte, we get up to 500bytes every few ms (use if f1 team)</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
// TODO: Refactor register page and fix direct load bug
// category=nuxt
// because of data implementation site can't be loaded directly without first getting the new udp pack, fix that
import { games } from '~/assets/js/games'
export default {
  data: () => ({
    games,
    game: null,
    settings: {},
    dialog: true

  }),
  head: {
    title: 'Register Client'
  },
  computed: {
    modding () {
      if (this.settings.usage === 2) {
        return true
      } else {
        return false
      }
    },
    usage () {
      return this.settings.usage
    },
    udpGame () {
      return this.$store.state.udp.game
    },
    udpRegister () {
      return this.$store.state.udp.register
    }

  },
  watch: {
    usage () {
      if (this.settings.usage === 2) {
        this.settings.visibility = 1
      }
    },
    udpRegister (val) {
      if (val === 'success') {
        this.$toast.success('Successfully regitered client')
        this.$router.push('/')
      }
    },
    udpGame (val) {
      this.game = val.game
    }
  },
  mounted () {
    if (this.udpRegister !== 'new') {
      // user got here not the right way, fix this: site breaks when going directly to register or make register a modal not a site
      this.$router.push('/')
    }
  },
  methods: {
    save () {
      if (this.settings.confirm === null || this.settings.usage === null || this.settings.visibility === null) {
        this.validateAlert = true
        return
      }
      // change vuex value that sends back data
      this.$store.commit('sockets/game', this.settings)
    }
  }
}
</script>
<style scoped>
.v-container{
  height: 100%;
  background: #121212;
  z-index: 1;
  position: relative;
}
</style>
