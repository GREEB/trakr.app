<template>
  <div />
</template>
<script>
import { unpack } from 'msgpackr'

export default {

  computed: {
    chordPack () { return this.$store.state.chordPack }
  },
  // Watch for change Store and do stuff
  watch: {
    chordPack (val) {
      if (val.length === 0) { return }
      this.$stage.parseChordPack(val)
    }

  },
  // init Three when mounted
  mounted () {
    // Init socket here so we can on 'chord' in here running this a lot over vuex is not cool could be fixed by freezing but didnt work
    this.socket = this.$nuxtSocket({
      withCredentials: true,
      teardown: false,
      extraHeaders: {
        path: this.$nuxt.$route.path
      }
    })
    this.socket
      .on('chord', (msg, cb) => {
        const buffer = unpack(this.toBuffer(msg))
        this.parsePoint(buffer.obj2Send)
        this.animateCar(buffer.obj2Send)
        this.followCam(buffer.obj2Send)
      /* Handle event */
      })
  }
}
</script>
