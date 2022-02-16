<template>
  <v-tooltip bottom content-class="toolbarToolTips">
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        dark
        small
        value="go to car"
        class="rounded-0"
        v-on="on"
        @click="$stage.orbit()"
      >
        <v-icon small>
          mdi-orbit
        </v-icon>
      </v-btn>
    </template>
    <span>Orbit Camera</span>
  </v-tooltip>
</template>
<script>
export default {
  data: () => ({
    car: null
  })
}
</script>
