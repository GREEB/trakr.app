<template>
  <v-app-bar
    clipped-left
    fixed
    app
    dense
    elevation="1"
  >
    <NuxtLink class="tb-icon" to="/">
      <v-tooltip v-model="showConnectionTooltip" bottom color="#000">
        <template #activator="{ on, attrs }">
          <v-img
            max-height="40"
            max-width="30"
            v-bind="attrs"
            class="logo"
            src="/logo512.png"
            :class="connected && onlineClass"
            v-on="on"
          />
        </template>
        <span class="connectionTooltip">
          <span :class="connected && 'connected'">Sockets</span><br>
          <span :class="isAuthenticated && 'connected'">Auth</span>
        </span>
      </v-tooltip>
    </NuxtLink>
    <v-toolbar-title v-text="title" />

    <v-btn
      class="ml-5 about"
      text
      small
      depressed
      to="/"
    >
      home
    </v-btn>
    <v-btn
      class="ml-5 about"
      text
      small
      depressed
      to="/about"
    >
      About
    </v-btn>
    <v-btn
      class="ml-5 about"
      text
      small
      depressed
      to="/hello"
    >
      Getting started
    </v-btn>
    <v-spacer />

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
    <client-only>
      <v-dialog
        v-if="!$auth.loggedIn"
        v-model="dialog"
        scrollable
        max-width="20em"
        persistent
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="blue darken-1"
            text
            class="ma-2 white--text"
            v-bind="attrs"
            v-on="on"
          >
            Login
            <v-icon
              right
              dark
            >
              mdi-discord
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Privacy Policy for trakr.app</v-card-title>
          <v-divider />
          <vue-scroll :ops="ops">
            <v-card-text style="height: 300px;">
              <PrivacyPolicy />
            </v-card-text>
          </vue-scroll>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey darken-1"
              text
              @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn
              color="green"
              text
              :href="discordURL"
              @click="dialog = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
            class="mr-2"
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
              <!-- <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
               -->
              <v-divider class="my-3" />
              <v-btn
                depressed
                text
                @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </client-only>
  </v-app-bar>
</template>
<script>

export default {
  data: () => ({
    ops: {
      bar: {
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: '#151515 ',
        opacity: 1,
        minSize: 0,
        size: '6px'
      }
    },
    dialog: false,
    title: 'trakr.app',
    onlineClass: 'online',
    gg: null,
    active: false,
    showConnectionTooltip: false,
    connectedText: 'Not connected',
    oauth: 'https://discord.com/api/oauth2/authorize?client_id=918603750057328640&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20email'
  }),
  computed: {
    bg () {
      return this.$vuetify.theme.themes
    },
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
      console.log(this.isAuthenticated)
      if (val && this.isAuthenticated) {
        this.connectedText = 'sockets, auth'
      } else if (val && !this.isAuthenticated) {
        this.connectedText = 'sockets, !auth'
      } else if (val) {
        this.connectedText = 'sockets'
      } else {
        this.connectedText = '!sockets'
      }

      this.showConnectionTooltip = true
      setTimeout(() => {
        this.showConnectionTooltip = false
      }, 1000)
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
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
      margin-left: -12px
      margin-top: 6px
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
