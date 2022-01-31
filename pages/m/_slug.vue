<template>
  <LazyToolBar />
</template>
<script>
import guiController from '~/mixin/guiController'
import stageController from '~/mixin/stageController'

export default {
  mixins: [guiController, stageController],
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
  head () {
    return {
      title: this.params.slug + ' Map'
    }
  },
  beforeDestroy () {
    this.$store.commit('room/leave', { ...this.params, name: this.$route.name })
    this.$stage.orbit(false)
    this.$stage.createEmptyPoints()
  },
  mounted () {
    this.$nextTick(() => {
      this.$stage.createEmptyPoints()
      this.$stage.setOrbitCam()
      this.$stage.camera.position.set(52, 29, 202)
      this.$store.commit('room/join', { ...this.params, name: this.$route.name })
    })
  }

}
</script>
