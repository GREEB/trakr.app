<template>
  <v-container>
    <h1 class="mb-4 mt-4 text-h4">
      Changelog
    </h1>
    <p>Github commits will be shown here</p>
    <v-card>
      <v-card-text>
        <vue-scroll :ops="ops">
          <nuxt-content style="max-height: calc(100vh - 246px)" :document="page" />
        </vue-scroll>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('CHANGELOG').fetch()
    return {
      page
    }
  },
  data: () => ({
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
  head: {
    title: 'Changelog'
  }
}
</script>
