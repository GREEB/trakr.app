<template>
  <v-menu open-on-hover offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        class="gay"
        small
        depressed
        v-bind="attrs"
        v-on="on"
      >
        More
        <v-icon class="ml-1" small>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-list dense class="pa-0">
      <v-list-item link to="/hello">
        <v-list-item-title>Getting Started</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/compatibility">
        <v-list-item-title>
          Compatibility
        </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/changelog">
        <v-list-item-title>
          Changelog
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <AppBarSocial />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
