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
      this.$stage.setSmoothCam()
      this.$stage.camera.position.set(-0.16198904908582307, 0.3551316000009279, 0.22134693608538228)

      this.$store.commit('room/home', 'data')
    }, 0)
  }
}
</script>
