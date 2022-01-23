<script>
export default {
  data () {
    return {
      socketStatus: null,
      socket: {}
    }
  },

  computed: {
    chordPack () { return this.$store.state.chordPack },
    connected () { return this.$store.state.connected },
    udpGame () { return this.$store.state.udpGame }
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
    /**
     *  Init socket here so we can on 'chord' in here running this a lot over vuex is not cool could be fixed by freezing but didnt work
     *  also need to do this because of weird component implementation putting this in layouts does fix loading it everytime but introduces bug on first login (send empty token, loads sockets before auth)
     *
     */
    if (!this.connected) {
      this.socket = this.$nuxtSocket({
        withCredentials: true,
        teardown: false,
        extraHeaders: {
          path: this.$nuxt.$route.path
        }
      })
      this.socket
        .on('chord', (msg, cb) => {
          // const parsed = games[gameId].parser.parse(Buffer.from(msg, 'hex'))

          // const buffer = unpack(this.toBuffer(msg))
          // this.parsePoint(buffer.obj2Send)
          // this.animateCar(buffer.obj2Send)
          // this.followCam(buffer.obj2Send)
        /* Handle event */
        })
    }
  }
}
</script>
