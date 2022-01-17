/* eslint-disable vue/no-parsing-error */
<template>
  <div class="v-container">
    <!-- Start dialog to say that this is not safe with wrong paras -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="520"
    >
      <v-card>
        <v-card-title class="red--text text-h5">
          Watch out!
        </v-card-title>
        <v-card-text class="text-body-1">
          You can make your browser or even pc <strong>crash</strong>
        </v-card-text>

        <v-card-actions>
          <v-checkbox
            v-model="askAgain"
            class="pt-0 mt-0 pr-3 pl-3"
            label="Don't ask again"
            color="red"
            value="red"
            hide-details
          />
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            to="/"
          >
            Go back gome
          </v-btn>
          <v-btn
            text
            @click="letMeIn"
          >
            Let me in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Start main settings card for stress page -->
    <v-card class="ma-5" max-width="20%">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-h6 mb-4">
            Stress Test Settings
          </div>
          <v-list-item-subtitle>
            These settings will help you play around with Three JS / our points
            engine
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-subheader> Point to add for each loop </v-subheader>
      <v-list-item>
        <v-slider
          v-model="points2add"
          thumb-label
          step="100"
          ticks
          hide-details
          min="1"
          max="1000"
        />
      </v-list-item>

      <v-subheader>Loop repeat in ms (lower = faster)</v-subheader>

      <v-list-item>
        <v-slider
          v-model="eventloop"
          thumb-label
          step="100"
          ticks
          hide-details
          min="1"
          max="1000"
        />
      </v-list-item>
      <v-subheader>Point Spread</v-subheader>

      <v-list-item>
        <v-slider
          v-model="spread"
          thumb-label
          step="100"
          ticks
          hide-details
          min="1"
          max="1000"
        />
      </v-list-item>
      <v-alert
        :value="alert"
        class="ma-3"
        dense
        outlined
        border="left"
        type="error"
      >
        This will maybe <strong>CRASH</strong> ur shit
      </v-alert>
      <v-subheader>Max Points (needs reset)</v-subheader>
      <v-list-item>
        <v-slider
          v-model="max"
          step="1000000"
          ticks
          hide-details
          :color="maxcolor"
          min="1"
          max="30000000"
        />
      </v-list-item>
      <v-list-item class="text-caption">
        Points: {{ countofpoint }}/{{ max }} {{ Math.round(countofpoint / max * 100) }}%
      </v-list-item>
      <v-card-actions>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @mouseup="stopAdd"
              @mousedown="addPoints"
            >
              Hold me
            </v-btn>
          </template>
          <span>Every {{ eventloop }} ms, {{ points2add }} points get added its position gets * {{ spread }}</span>
        </v-tooltip>
        <v-btn color="error" class="resetscene ml-2" @click="resetStage">
          Reset Scene
        </v-btn>
      </v-card-actions>
      <v-list-item class="text-caption">
        Presets
      </v-list-item>
      <v-card-actions>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @click="preset1(100)"
            >
              100%
            </v-btn>
          </template>
          <span>Adding {{ max }} points</span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @click="preset1(50)"
            >
              50%
            </v-btn>
          </template>
          <span>Adding {{ max / 2 }} points</span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="ml-2"
              v-on="on"
              @click="preset1(10)"
            >
              10%
            </v-btn>
          </template>
          <span>Adding  10% = {{ Math.round((max / 100) * 10) }} points</span>
        </v-tooltip>
      </v-card-actions>
      <v-card-actions />
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      alert: false,
      stageZ: 0,
      eventloop: 100,
      points2add: 200,
      points: null,
      interval: null,
      dialog: false,
      spread: 100,
      countofpoint: 0,
      max: 0,
      askAgain: null

    }
  },
  // middleware: 'isAuthenticated',
  head: {
    title: 'Stress'
  },
  computed: {
    maxcolor () {
      if (this.alert) {
        return 'red'
      } else {
        return 'primary'
      }
    }
  },
  watch: {
    max (val) {
      if (val > 10000000) {
        this.alert = true
      } else {
        this.alert = false
      }
    }
  },
  mounted () {
    const cookieRes = this.$cookies.get('stressaskAgain')
    console.log(cookieRes)
    if (cookieRes === undefined) {
      this.dialog = true
    } else {
      this.dialog = false
    }
    /**
     * Wait for three js if not loaded maybe have a global for this
     * If loaded just set max
     *  else
     *    wait a bit for stage (really bad :)
     *
     */
    if (this.$stage) {
      this.max = this.$stage.maxParticle * 3
    } else {
      setTimeout(() => {
        this.max = this.$stage.maxParticle * 3
      }, 500)
    }
  },
  methods: {
    letMeIn () {
      this.dialog = false
      if (this.askAgain) {
        this.$cookies.set('stressaskAgain', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    },
    /**
     * Performance Note: the bigger MaxParticles is the slower it is to add new ones after a few mil x 3 it gets slow not sure about that yet
     * doesnt matter how fast we add points as long as maxpoints is small ms for frames stays sub 100ms
     */
    addPoints () {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        for (let index = 0; index < this.points2add; index++) {
          this.$stage.parsePoint({
            x: Math.random() * this.spread,
            y: Math.random() * this.spread,
            z: Math.random() * this.spread
          })
        }
        this.countofpoint = this.$stage.pointsCount
      }, this.eventloop)
    },
    preset1 (percentage) {
      this.resetStage()
      // we set percentage of points from max points
      for (let g = 0; g < Math.sqrt(this.max / 3 / 100 * percentage / 200)
        ; g++) {
        for (let index = 0; index < Math.sqrt(this.max / 3 / 100 * percentage * 200)
          ; index++) {
          this.$stage.parsePoint({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            z: g * 10
          })
        }
      }
      this.countofpoint = this.$stage.pointsCount
    },
    resetStage () {
      this.countofpoint = 0
      this.$stage.createEmptyPoints()
    },
    stopAdd () {
      this.spread += 20
      this.points2add += 10
      clearInterval(this.interval)
    }
  }
}
</script>
<style scoped>
.v-subheader{
  height: 1em;
}
.tooltipfix{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
}

</style>
