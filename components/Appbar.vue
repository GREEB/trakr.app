<template>
  <v-app-bar
    clipped-left
    fixed
    app
    dense
  >
    <img src="~static/logo512.png">
    <v-toolbar-title v-text="title" />
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
    gg: null,
    active: false,
    oauth: 'https://discord.com/api/oauth2/authorize?client_id=918603750057328640&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20email'
  }),
  computed: {
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
    }
  },
  watch: {
    pointCounts (count) {
      this.gg = count
      // Our fancy notification (2).
      // console.log(`We have ${count} fruits now, yay!`)
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }

}
</script>
