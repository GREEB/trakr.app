
<template>
  <div class="v-container d-flex justify-center align-center">
    <div>
      <v-row class="d-flex justify-center">
        <img class="travolta" src="~/assets/image/travolta.gif" alt="">
        <h1 v-if="error.statusCode === 404" class="text-h1">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
      </v-row>
      <!-- {{ error }} -->
      <v-row class="d-flex justify-center">
        <v-btn text class="text-center mt-10" x-large to="/">
          Go Back Home
        </v-btn>
      </v-row>
    </div>
  </div>
  <!-- Inject sockets into the template maybe not the best way? -->
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="sass" scoped>
.travolta
  position: absolute
  left: 11%
  bottom: 0
.v-container
  height: 100%
  // background: #121212
  z-index: 1
  position: relative
h1
  font-size: 20px
</style>
