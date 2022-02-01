
<template>
  <div class="v-container d-flex justify-center align-center">
    <div>
      <v-row class="d-flex justify-center">
        <img class="travolta" src="~/assets/image/travolta.gif" alt="Travolta" style="z-index:1;pointer-events: none;">

        <h1 class="text-h1">
          {{ error.statusCode }}
        </h1>
      </v-row>
      <v-row class="d-flex justify-center">
        <h1 class="text-h4 ">
          {{ error.message.split(';')[0] }}
        </h1>
      </v-row>
      <v-row>
        <p class="mt-3" style="font-size: 1.25rem;z-index: 9">
          {{ error.message.split(';')[1] }}
        </p>
      </v-row>
      <!-- {{ error }} -->
      <v-row v-if="error.statusCode === 429">
        <v-col cols="4">
          <AppBarSocial style="z-index:0" />
        </v-col>
        <v-col class="d-flex align-center">
          <div class="text-right text-caption">
            We've disconnected this tab from our services
          </div>
        </v-col>
        <v-col cols="2">
          <AppBarLogs />
        </v-col>
      </v-row>
      <v-row v-if="error.statusCode === 404" class="d-flex justify-center">
        <v-btn class="text-center mt-10" x-large to="/">
          Go Back Home
        </v-btn>
      </v-row>
      <v-row />
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
  left: 20%
  bottom: 0
.travolta2
  position: absolute
  transform: scaleX(-1)
  bottom: 0
  right: 20%
.v-container
  height: 100%
  // background: #121212
  z-index: 1
  position: relative
h1
  font-size: 20px
</style>
