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
        @click="$stage.cam2Car()"
      >
        <v-icon small>
          mdi-crosshairs
        </v-icon>
      </v-btn>
    </template>
    <span>Go to car</span>
  </v-tooltip>
</template>
<script>
export default {
  data: () => ({
    car: null
  })
}
</script>
