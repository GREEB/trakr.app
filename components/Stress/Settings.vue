<template>
  <v-list
    nav
    dense
  >
    <v-alert
      v-if="full"
      dense
      outlined
      type="error"
    >
      Array Full
    </v-alert>
    <v-list-item>
      <v-list-item-content>
        <span class="text-caption">Points: {{ countofpoint }}/{{ max }} <strong>{{ Math.round(countofpoint / max * 100) }}%</strong></span>
      </v-list-item-content>
    </v-list-item>
    <!-- ITEM -->
    <v-list-item :disabled="full">
      <v-list-item-icon>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-ray-vertex
            </v-icon>
          </template>
          <span>Point to add for each loop</span>
        </v-tooltip>
      </v-list-item-icon>
      <v-slider
        v-model="points2add"
        thumb-label
        step="100"
        ticks
        hide-details
        min="0"
        max="10000"
      />
    </v-list-item>
    <!-- ITEM END -->

    <!-- ITEM -->
    <v-list-item :disabled="full">
      <v-list-item-icon>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-timer
            </v-icon>
          </template>
          <span>Loop repeat in ms</span>
        </v-tooltip>
      </v-list-item-icon>
      <v-slider
        v-model="eventloop"
        thumb-label
        step="100"
        ticks
        hide-details
        min="0"
        max="1000"
      />
    </v-list-item>
    <!-- ITEM END -->

    <!-- ITEM -->
    <v-list-item :disabled="full">
      <v-list-item-icon>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-relative-scale
            </v-icon>
          </template>
          <span>Point Spread</span>
        </v-tooltip>
      </v-list-item-icon>
      <v-slider
        v-model="spread"
        thumb-label
        step="100"
        ticks
        hide-details
        min="0"
        max="10000"
      />
    </v-list-item>
    <!-- ITEM END -->
    <!-- ITEM -->

    <v-alert
      v-if="alert"
      :value="alert"
      dense
      outlined
      border="left"
      type="error"
    >
      <strong>CRASH</strong> Potential
    </v-alert>
    <v-list-item :disabled="full">
      <v-list-item-icon>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-basket-fill
            </v-icon>
          </template>
          <span>Max Points (needs reset)</span>
        </v-tooltip>
      </v-list-item-icon>
      <v-slider
        v-model="max"
        step="1000000"
        ticks
        hide-details
        :color="maxcolor"
        min="0"
        max="30000000"
      />
    </v-list-item>
    <!-- ITEM END -->

    <v-list-item
      :disabled="full"
      link
      @mouseup="stopAdd"
      @mousedown="addPoints"
    >
      <v-list-item-icon>
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-drawing
            </v-icon>
          </template>
          <span>Every {{ eventloop }} ms, {{ points2add }} points get added its position gets * {{ spread }}</span>
        </v-tooltip>
      </v-list-item-icon>
      <v-list-item-title>Hold Me</v-list-item-title>
    </v-list-item>
    <v-list-item link @click="$stage.orbit()">
      <v-list-item-icon>
        <v-icon>mdi-orbit</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Auto Rotate</v-list-item-title>
    </v-list-item>
    <v-list-item link class="red white--text" @click="resetStage">
      <v-list-item-icon>
        <v-icon>mdi-delete-empty</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Delete All Points</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data () {
    return {
      alert: false,
      stageZ: 0,
      eventloop: 1,
      points2add: 200,
      points: null,
      interval: null,
      spread: 100,
      countofpoint: 0,
      max: 0
    }
  },
  // middleware: 'isAuthenticated',
  head: {
    title: 'Stress'
  },
  computed: {
    full () {
      return Math.round(this.countofpoint / this.max * 100) > 100
    },
    maxcolor () {
      if (this.alert) {
        return 'red'
      } else {
        return 'primary'
      }
    }
  },
  watch: {
    full (val) {
      if (val) {
        clearInterval(this.interval)
      }
    },
    max (val) {
      if (val > 10000000) {
        this.alert = true
      } else {
        this.alert = false
      }
    }
  },
  mounted () {
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
  /**
     * Performance Note: the bigger MaxParticles is the slower it is to add new ones after a few mil x 3 it gets slow not sure about that yet
     * doesnt matter how fast we add points as long as maxpoints is small ms for frames stays sub 100ms
     */
  methods: {
    addPoints () {
      clearInterval(this.interval)
      if (!this.full) {
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
      }
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
      clearInterval(this.interval)
      this.spread += 100
      this.points2add += 200
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
