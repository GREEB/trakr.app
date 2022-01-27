</script>
<template>
  <LazyToolBar />
</template>
<script>
import guiController from '~/mixin/guiController'
import stageController from '~/mixin/stageController'

export default {
  mixins: [guiController, stageController],
  middleware: 'isFirstVisit',
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    // ask for full map data and register to io room for this map
    return { params }
  },
  data () {
    return {
      interval: null
    }
  },
  head: {
    title: 'Home'
  }
}
</script>
