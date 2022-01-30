<template>
  <div class="text-center">
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="32"
      />
      <h4 class="pa-5">
        {{ loadingText
        }}
      </h4>
    </v-overlay>
  </div>
</template>

<script>
/**
 * Make this smarter and faster ;)
 */
export default {
  data () {
    return {
      loadingText: 'Loggin you in',
      overlay: true,
      loginData: {
        code: null
      }
    }
  },
  mounted () {
    if (this.$route.query.code) {
      // check origin?
      this.loginData.code = this.$route.query.code
      this.login()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginData
        })
        const cookieRes = this.$cookies.get('firstLogin')
        if (cookieRes === undefined) {
          this.$router.push('/hello')
          this.$cookies.set('firstLogin', Date.now(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 * 191
          })
        } else {
          this.$router.push('/')
        }
      } catch (err) {
        this.loadingText = err.response.data.error
        this.$router.push('/')
      }
    }
  }
}
</script>
