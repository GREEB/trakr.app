<template>
  <v-app-bar
    clipped-left
    fixed
    app
    dense
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
    <v-toolbar-title v-text="title" />
    <v-btn
      class="ml-5"
      text
      to="/about"
    >
      About
    </v-btn>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
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
    </v-menu>
    <v-spacer />
    <v-chip
      id="pointsCount"
      outlined
      dark
      label
      small
      text-color="white"
    >
      <v-icon left>
        mdi-ray-vertex
      </v-icon>
      {{ gg }}
    </v-chip>
    <v-spacer />
    <div>
      <v-btn
        v-if="!$auth.loggedIn"
        color="blue darken-1"
        text
        class="ma-2 white--text"
        :href="oauth"
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
        v-if="$auth.loggedIn"
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
                alt=""
              >

              <!-- <span class="white--text text-h5">dfgdg</span> -->
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
    </div>
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
    connectedText: '',
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
    pointCounts () {
      return this.$store.state.points.count
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
    },
    pointCounts (count) {
      this.gg = count
    }
  },
  mounted () {
    console.log(this.discordURL)
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }

}
</script>

<style lang="sass" scoped>
.logo
    transition: all 0.5s ease
    filter: grayscale(1)
    margin-top: 0.3em
.logo
  height: 30px
.online
  filter: grayscale(0)
</style>
