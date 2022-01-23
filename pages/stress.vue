/* eslint-disable vue/no-parsing-error */
<template>
  <v-container fluid class="pa-0 height">
    <Gui />
    <!-- Start dialog to say that this is not safe with wrong paras -->
    <StressDialog />
    <!-- Start main settings card for stress page -->

    <v-navigation-drawer permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-icon>mdi-test-tube</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Stress test
            </v-list-item-title>
            <v-list-item-subtitle>
              Play around with the points engine
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <StressSettings />
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import guiController from '../mixin/guiController'
import stageController from '../mixin/stageController'
export default {
  mixins: [guiController, stageController],
  beforeDestroy () {
    this.$stage.orbit(false)
    this.$stage.createEmptyPoints()
  }
}
</script>
