<template>
  <ToolBar />
</template>
<script>
import guiController from '~/mixin/guiController'
import stageController from '~/mixin/stageController'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  mixins: [guiController, stageController],
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    // ask for full map data and register to io room for this map
    return { params }
  },
  data () {
    return {
      overlay: true,
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
    // we check if we have a cached points for this map
    // if we do load it, maybe check age, this would help switch back between global map and user screen
    this.$nextTick(() => {
      this.$stage.createEmptyPoints()
      this.$stage.setOrbitCam()
      // this sets cam pos for fh5
      if (this.params.slug === 'fh5') {
        this.$stage.camera.position.set(0, 0, 500)
        this.$stage.camera.rotation.set(0, 0, 0)
      }
      // Cache check
      if (this.params.slug in this.$stage.chordPackCache) {
        this.$stage.points.geometry.attributes.position.array = this.$stage.chordPackCache[this.params.slug]
        // this.$stage.scene.add(this.points)
        this.$stage.geometry.setDrawRange(0, this.$stage.points.geometry.attributes.position.array.length)
        this.$stage.points.needsUpdate = true
      } else {
        this.$toast.info(`Loading ${this.params.slug} map`, {
          icon: LoadingIcon
        })
        this.$store.commit('room/join', { ...this.params, name: this.$route.name })
      }
    })
  }

}
</script>
