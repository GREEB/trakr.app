<template>
  <v-dialog
    v-model="dialog"
    max-width="90%"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        color="error"
        :disabled="settings || !$auth.loggedIn"
        v-on="on"
      >
        Wrong Game
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Wrong Game?
      </v-card-title>

      <v-card-text>
        Check the list below for the right URL you need to input
      </v-card-text>
      <Compatibility />

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    settingsData: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    settings: false,
    dialog: false
  }),
  watch: {
    settingsData (val) {
      this.settings = val
    }
  }
}
</script>
