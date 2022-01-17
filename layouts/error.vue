<template>
  <v-app dark>
    <div>
      <v-card
        class="d-flex justify-center align-center mb-6"
        flat
        tile
        height="100vh"
      >
        <div>
          <h1 v-if="error.statusCode === 404" class="text-h1">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <NuxtLink to="/" class="text-h3 text-center">
            Home page
          </NuxtLink>
        </div>
      </v-card>
    </div>
  </v-app>
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

<style>

h1 {
  font-size: 20px;
}
</style>
