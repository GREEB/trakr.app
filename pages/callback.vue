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
      console.log(this.$route.query.code)
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
        this.$router.push('/')
      } catch (err) {
        this.loadingText = err.response.data.error
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }
    }
  }
}
</script>
