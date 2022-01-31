export default {
  computed: {
    error () {
      return this.$store.state.error
    }
  },
  watch: {
    error (val) {
      if (Object.keys(val).length === 0) { return }
      this.$nuxt.error({ statusCode: 404, message: val.message })
    }
  }
}
