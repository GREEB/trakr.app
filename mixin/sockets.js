
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
    udpGame () { return this.$store.state.udp.game },
    currentSlug () { return this.$route.params.slug }
  },
  // Watch for change Store and do stuff
  /**
   * TODO: Keep track of different pointbuffers so we can hide and show when switching pages
   * category=threejs
   */
  watch: {
    chordPack (val) {
      if (val.length === 0) { return }
      if (this.currentSlug === undefined) {
        this.$stage.parseChordPack(val, true)
      } else {
        this.$stage.parseChordPack(val, false)
      }
    }
  },
  methods: {
    parseGlobalChord (msg) {
      this.$stage.parsePoint([(msg.PositionX / 20).toFixed(3), (msg.PositionY / 20).toFixed(3), (msg.PositionZ / 20).toFixed(3)])
    },
    parseUserData (msg) {
      // eslint-disable-next-line no-lonely-if
      if (this.udpGame && this.udpGame.game !== undefined) {
        const parsed = games[this.udpGame.game].parsers.full.parse(Buffer.from(msg, 'hex'))
        // console.log(Buffer.from(msg, 'hex').toString('hex'))
        // console.log(parsed.PositionX, parsed.PositionY, parsed.PositionZ)
        const data = [
          (parsed.PositionX / 20).toFixed(3),
          (parsed.PositionY / 20).toFixed(3),
          (parsed.PositionZ / 20).toFixed(3),
          parsed.YawPitchRoll[0],
          parsed.YawPitchRoll[1],
          parsed.YawPitchRoll[2],
          parsed.Steer,
          parsed.Brake
        ]
        // data = data.map(function (el) {
        //   return Number(el.toFixed(2))
        // })
        this.$stage.parsePoint(data)

        this.$stage.animateCar(data)
      // this.$stage.followCam(parsed.Position)
      }
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
        extraHeaders: {
          path: this.$nuxt.$route.path
        }
      })
      this.socket
        .on('chord', (msg) => {
          if (this.currentSlug === undefined) {
            this.parseUserData(msg)
          }
        })
      this.socket.on('globalChord', (msg) => {
        if (this.currentSlug !== undefined) {
          this.parseGlobalChord(msg)
        }
      })
    }

    // const buffer = unpack(this.toBuffer(msg))

    /* Handle event */
  }
}
