<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <template #activator="{ on }">
      <v-btn
        class="mx-2"
        fab
        dark
        x-small
        v-on="on"
      >
        <v-avatar
          size="30"
        >
          <img
            :src="avatar"
            alt="Avatar"
          >
        </v-avatar>
      </v-btn>
    </template>
    <AppBarUserSettings />
  </v-menu>
</template>
<script>
export default {
  computed: {
    avatar () {
      return `https://cdn.discordapp.com/avatars/${this.$auth.user.did}/${this.$auth.user.avatar}.png`
    }
  }
}
</script>
