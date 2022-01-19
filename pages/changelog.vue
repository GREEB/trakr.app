<template>
  <div class="fhContainer">
    <v-container>
      <div class="mb-4 mt-4 text-h3">
        Changes
      </div>
      <p>Github commits will be shown here</p>
      <v-card
        class="mx-auto"
        outlined
      >
        <v-card-text>
          <nuxt-content :document="page" />
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('CHANGELOG').fetch()
    return {
      page
    }
  }
}
</script>
