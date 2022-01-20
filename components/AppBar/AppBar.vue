<template>
  <v-app-bar
    app
    dense
  >
    <AppBarLogo />
    <v-toolbar-title v-text="title" />
    <AppBarMenu />

    <v-spacer />

    <AppBarSettings />
    <AppBarLogin v-if="$config.dev" />
  </v-app-bar>
</template>
<script>

export default {
  data: () => ({
    title: 'trakr.app'
  })
}
</script>
