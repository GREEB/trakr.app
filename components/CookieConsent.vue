<template>
  <div>
    <v-alert
      v-model="cookieConsent"
      class="ma-0 cookie"
      color="accent"
    >
      <h3 class="text-h5">
        Cookies
      </h3>
      <div>We use our own cookies and third-party cookies to understand how you use trakr.app, with the goal to improve the services we offer. If you continue browsing, we consider that you have accepted the cookies.</div>

      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      />

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
          <v-btn
            outlined
            @click="accept()"
          >
            Accept
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col class="shrink">
          <v-btn
            style="opacity:0.69"

            href="https://gdpr-info.eu/"
            outlined
          >
            Decline
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
export default {
  data: () => ({
    cookieConsent: false
  }),
  mounted () {
    if (this.$cookies.get('cookie') !== true) {
      this.cookieConsent = true
    }
  },
  methods: {
    accept () {
      this.$cookies.set('cookie', true)
      this.cookieConsent = !this.cookieConsent
    }
  }
}
</script>

<style lang="sass" scoped>
.cookie
    position: absolute
    right: 1em
    bottom: 1em
    z-index: 20
    max-width: 300px
    background: accent !important
</style>
