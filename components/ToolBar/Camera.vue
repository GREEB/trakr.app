<template>
  <v-speed-dial
    v-model="camera"
    open-on-hover
    direction="right"
    style="width: fit-content;"
  >
    <template #activator>
      <v-tooltip bottom content-class="toolbarToolTips">
        <template #activator="{ on, attrs }">
          <v-btn
            v-model="camera"
            v-bind="attrs"
            color="accent"
            dark
            small
            class="pa-0 ma-0 rounded-0"
            v-on="on"
          >
            <v-icon small>
              mdi-cctv
            </v-icon>
          </v-btn>
        </template>
        <span>Camera</span>
      </v-tooltip>
    </template>
    <v-tooltip bottom content-class="toolbarToolTips">
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          dark
          small
          class="pa-0 ma-0 rounded-0"
          v-on="on"
          @click="$stage.setOrbitCam()"
        >
          <v-icon small>
            mdi-cube-off-outline
          </v-icon>
        </v-btn>
      </template>
      <span>Free Cam</span>
    </v-tooltip>
    <v-tooltip bottom content-class="toolbarToolTips">
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          dark

          small
          class="pa-0 ma-0 rounded-0"
          v-on="on"
          @click="$stage.setFollowCam()"
        >
          <v-icon small>
            mdi-cube-scan
          </v-icon>
        </v-btn>
      </template>
      <span>Simple Track</span>
    </v-tooltip>
    <v-tooltip bottom content-class="toolbarToolTips">
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          dark
          small
          class="pa-0 ma-0 rounded-0"
          v-on="on"
          @click="$stage.setSmoothCam()"
        >
          <v-icon small>
            mdi-cube-send
          </v-icon>
        </v-btn>
      </template>
      <span>3rd Person</span>
    </v-tooltip>
    <v-tooltip bottom content-class="toolbarToolTips">
      <template #activator="{ on, attrs }">
        <v-btn
          disabled
          v-bind="attrs"
          dark
          small
          class="pa-0 ma-0 rounded-0"
          v-on="on"
          @click="$stage.setFirstPerson()"
        >
          <v-icon small>
            mdi-emoticon-happy-outline
          </v-icon>
        </v-btn>
      </template>
      <span>First Person</span>
    </v-tooltip>
  </v-speed-dial>
</template>
<script>
export default {
  data: () => ({
    camera: null
  })
}
</script>
