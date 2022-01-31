<template>
  <div class="menuContainer">
    <v-btn
      text
      small
      to="/"
    >
      home
    </v-btn>
    <AppBarMapsMenu />

    <v-btn
      text
      class="about"
      small
      to="/about"
    >
      About
    </v-btn>

    <AppBarMoreMenu />
  </div>
</template>
<style lang="sass" scoped>
.version
  text-decoration: none
</style>
