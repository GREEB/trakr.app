<template>
  <v-app dark>
    <AppBar />
    <LazyRegisterClient />
    <v-main>
      <div class="stage" />
      <Gui />
      <Nuxt />
    </v-main>
    <!-- Inject sockets into the template maybe not the best way? -->
  </v-app>
</template>
<style>

.lil-gui .title{
 font-size: 1em !important;
 line-height: 1.7em;
}
</style>
