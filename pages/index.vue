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
  beforeDestroy () {
    this.$stage.orbit(false)
    this.$stage.createEmptyPoints()
  },
  mounted () {
    this.$nextTick(() => {
      this.$stage.setSmoothCam()
      this.$stage.camera.position.set(-0.16198904908582307, 0.3551316000009279, 0.22134693608538228) // our default view this needs a function
      this.$store.commit('room/home', Date.now()) // if commiting same twice wont trigger sockets again so time as unique value hack
    })
  }
}
</script>
