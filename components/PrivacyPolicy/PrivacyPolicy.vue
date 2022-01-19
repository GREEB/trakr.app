<template>
  <v-card>
    <v-card-title>Privacy Policy for trakr.app</v-card-title>
    <v-divider />
    <vue-scroll :ops="ops">
      <v-card-text style="height: 300px;">
        <PrivacyPolicyText />
      </v-card-text>
    </vue-scroll>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="grey darken-1"
        text
        @click="$emit('close-dialog')"
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
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    ops: {
      bar: {
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: '#151515 ',
        opacity: 1,
        minSize: 0,
        size: '6px'
      }
    }
  }),
  computed: {
    discordURL () {
      const baseurl = 'https://discord.com/api/oauth2/authorize'
      const clientID = '?client_id=' + this.$config.discordId
      const redirect = '&redirect_uri=' + encodeURIComponent(this.$config.baseURL || 'http://localhost:3000') + '/callback' // http://localhost:3000/callback
      const rest = '&response_type=code&scope=identify%20email'
      return baseurl + clientID + redirect + rest
    }
  }
}
</script>
