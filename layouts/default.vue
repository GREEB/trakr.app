<template>
  <v-app dark>
    <Appbar />

    <v-main>
      <FloatingMenuGithub />
      <FloatingMenuSettings />
      <div class="stage" />
      <div class="float-right ma-5 guicontainer">
        <v-card>
          <div class="gui" />
        </v-card>
      </div>
      <Nuxt />
    </v-main>
    <!-- Inject sockets into the template maybe not the best way? -->
  </v-app>
</template>
<style>
/* lil gui fix cuz vuetify wanted to style it and main is injected before vuetify */
.gui{
  display: none
}
.lil-gui .title{
 font-size: 1em !important;
 line-height: 1.7em;
}
</style>
