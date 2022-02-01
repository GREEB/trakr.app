export default {
  computed: {
    error () {
      return this.$store.state.error
    }
  },
  watch: {
    error (val) {
      console.log(val)
      if (Object.keys(val).length === 0) { return }
      this.$nuxt.error({ statusCode: val.code, message: val.msg })
    }
  }
}
