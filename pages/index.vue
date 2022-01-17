<template>
  <div>
    <Sockets />
  </div>
</template>
<script>
export default {
  middleware: 'isAuthenticated',
  data () {
    return {
      interval: null
    }
  },
  head: {
    title: 'Home'
  },
  methods: {
    /**
     * Performance Note: the bigger MaxParticles is the slower it is to add new ones after a few mil x 3 it gets slow not sure about that yet
     * doesnt matter how fast we add points as long as maxpoints is small ms for frames stays sub 100ms
     */
    addPoints () {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        for (let index = 0; index < 100; index++) {
          this.$stage.parsePoint({ x: Math.random() * 100 * index, y: Math.random() * 100 * index, z: Math.random() * 100 * index })
        }
      }, 0)
    },
    stopAdd () {
      clearInterval(this.interval)
    }
  }
}
</script>
<style>
.lil-gui.root{
  display: block;
}
</style>
