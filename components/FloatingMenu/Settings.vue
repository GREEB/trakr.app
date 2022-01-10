<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mx-2 settingsBtn"
        fab
        dark
        x-small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-wrench
        </v-icon>
      </v-btn>
    </template>

    <v-card offset-x="true">
      <v-list-item class="guilist" two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            Settings
          </v-list-item-title>
          <v-list-item-subtitle>UID: 1278312, Points</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-sheet
        elevation="10"
        class="py-4 px-1"
      >
        <v-chip-group
          multiple
          active-class="primary--text"
        >
          <v-chip>
            123
          </v-chip>
        </v-chip-group>
      </v-sheet>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="message"
              color="purple"
            />
          </v-list-item-action>
          <v-list-item-title>Show bounding box</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="allSettings"

              color="purple"
              @change="toggleSettings"
            />
          </v-list-item-action>
          <v-list-item-title>toggle lil gui</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />

        <v-btn
          @click="menu = false"
        >
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    gg: null,
    fav: true,
    menu: false,
    message: false,
    allSettings: false
  }),
  methods: {
    toggleSettings (w) {
      const el = document.querySelector('.lil-gui')
      if (w) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  }
}
</script>
