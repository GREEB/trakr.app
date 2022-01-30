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
      <v-list-item link to="/stress">
        <v-list-item-title>
          Stress
        </v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-divider />

      <v-subheader>External Links</v-subheader>

      <v-list-item>
        <AppBarSocial />
      </v-list-item>
      <v-list-item>
        <NuxtLink class="version text-decoration-none" to="/changelog">
          <v-subheader>
            v.{{ $config.version }}
          </v-subheader>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
