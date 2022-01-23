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
          :color="btncolor"
          small
          v-bind="attrs"
          v-on="on"
        >
          Login
          <v-icon
            right
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
  props: {
    btncolor: {
      type: String,
      default: '#7289da'
    },
    btnsize: {
      type: String,
      default: 'small'
    }
  },
  data: () => ({
    dialog: false
  })
}
</script>
