<template>
  <v-app dark>
    <Appbar />

    <v-main>
      <v-container>
        <FloatingMenuGithub />
        <FloatingMenuSettings />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="sass">
  @import '~assets/main.sass'
</style>
