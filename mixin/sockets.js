import { games } from '~/assets/js/games'
export default {
  data () {
    return {
      games,
      socketStatus: null,
      socket: {}
    }
  },

  computed: {
    chordPack () { return this.$store.state.chordPack },
    connected () { return this.$store.state.connected },
    udpGame () { return this.$store.state.udp.game }
  },
  // Watch for change Store and do stuff
  watch: {
    chordPack (val) {
      if (val.length === 0) { return }
      this.$stage.parseChordPack(val)
    },
    udpGame (val) {
      console.log(val)
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
          if (this.udpGame.game !== undefined) {
            const parsed = games[this.udpGame.game].parser.parse(Buffer.from(msg, 'hex'))
            this.$stage.parsePoint([parsed.Position[0], parsed.Position[1], parsed.Position[2]])
            // this.$stage.animateCar(parsed.Position)
            // this.$stage.followCam(parsed.Position)
          }
        })
    }

    // const buffer = unpack(this.toBuffer(msg))

    /* Handle event */
  }
}
