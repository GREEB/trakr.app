<template>
  <client-only>
    <v-dialog
      v-if="!$auth.loggedIn"
      v-model="dialog"
      scrollable
      max-width="20em"
      persistent
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="blue darken-1"
          text
          class="ma-2 white--text"
          v-bind="attrs"
          v-on="on"
        >
          Login
          <v-icon
            right
            dark
          >
            mdi-discord
          </v-icon>
        </v-btn>
      </template>
      <LazyPrivacyPolicy @close-dialog="dialog = false" />
    </v-dialog>
    <AppBarAvatar v-else />
  </client-only>
</template>
<script>
export default {
  data: () => ({
    dialog: false
  })

}
</script>
