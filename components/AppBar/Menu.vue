<template>
  <div class="menuContainer">
    <v-btn
      text
      small
      to="/"
    >
      home
    </v-btn>
    <v-btn
      text
      class="about"
      small
      to="/about"
    >
      About
    </v-btn>
    <v-btn
      text
      small
      to="/hello"
    >
      Getting Started
    </v-btn>
    <AppBarMapsMenu />
    <AppBarMoreMenu />
  </div>
</template>
<style scoped>
.version{
  text-decoration: none;
}
</style>
