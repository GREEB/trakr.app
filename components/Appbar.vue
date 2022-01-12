<template>
  <v-app-bar
    clipped-left
    fixed
    app
    dense
    rounded
    elevation="1"
  >
    <v-tooltip v-model="showConnectionTooltip" bottom>
      <template #activator="{ on, attrs }">
        <img
          v-bind="attrs"
          class="logo"
          src="~static/logo512.png"
          :class="connected && onlineClass"
          v-on="on"
        >
      </template>
      <span>{{ connectedText }}</span>
    </v-tooltip>
    <NuxtLink class="tb-icon" to="/">
      <v-toolbar-title v-text="title" />
    </NuxtLink>
    <v-btn
      class="ml-5"
      text
      small
      to="/about"
    >
      About
    </v-btn>
    <!-- <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          small
          class="mx-1"
          dark
          v-bind="attrs"
          text
          v-on="on"
        >
          Maps
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <NuxtLink to="/">
            <v-list-item-title>
              Froza Horizon 5
            </v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <v-spacer />
    <!-- Not sure how to fix this error the right way -->
    <!-- <client-only>
      <v-btn
        v-if="!$auth.loggedIn"
        color="blue darken-1"
        text
        class="ma-2 white--text"
        :href="discordURL"
      >
        Login
        <v-icon
          right
          dark
        >
          mdi-discord
        </v-icon>
        <v-icon
          dark
          right
        >
          mdi-open-in-new
        </v-icon>
      </v-btn>
      <v-menu
        v-else
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template #activator="{ on }">
          <v-btn
            small
            icon
            v-on="on"
          >
            <v-avatar
              size="30"
            >
              <img
                :src="avatar"
                alt="Test"
              >
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ $auth.user.username }}</h3>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </client-only> -->
  </v-app-bar>
</template>
<script>

export default {
  data: () => ({
    title: 'trakr.app',
    onlineClass: 'online',
    gg: null,
    active: false,
    showConnectionTooltip: false,
    connectedText: 'Not connected',
    oauth: 'https://discord.com/api/oauth2/authorize?client_id=918603750057328640&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20email'
  }),
  computed: {
    discordURL () {
      const baseurl = 'https://discord.com/api/oauth2/authorize'
      const clientID = '?client_id=' + this.$config.discordId
      const redirect = '&redirect_uri=' + encodeURIComponent(process.env.URL || 'http://localhost:3000') + '/callback' // http://localhost:3000/callback
      const rest = '&response_type=code&scope=identify%20email'
      return baseurl + clientID + redirect + rest
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    getUserInfo () {
      return this.$store.getters.getUserInfo
    },
    avatar () {
      return `https://cdn.discordapp.com/avatars/${this.$auth.user.did}/${this.$auth.user.avatar}.png`
    },
    connected () {
      return this.$store.state.connected
    }
  },
  watch: {
    connected (val) {
      if (val) {
        this.connectedText = 'Connected'
      } else {
        this.connectedText = 'Disconncted'
      }

      this.showConnectionTooltip = true
      setTimeout(() => {
        this.showConnectionTooltip = false
      }, 1000)
    }
  },
  created () {
    setInterval(() => {
      if (this.pc) {
        console.log(this.count)
      }
    }, 1000)
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }

}
</script>

<style lang="sass" scoped>
.tb-icon
  font-weight: 600
  text-decoration: none
  color: #fff
.logo
    transition: all 0.5s ease
    filter: grayscale(1)
    margin-top: 0.3em
.logo
  height: 30px
.online
  filter: grayscale(0)
</style>
