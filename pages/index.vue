<template>
  <LazyToolBar />
</template>
<script>
import guiController from '../mixin/guiController'
import stageController from '../mixin/stageController'

export default {
  mixins: [guiController, stageController],
  middleware: 'isFirstVisit',
  data () {
    return {
      interval: null
    }
  },
  head: {
    title: 'Home'
  },
  mounted () {
    setTimeout(() => {
      this.$store.commit('room/home', 'data')
    }, 0)
  }
}
</script>
