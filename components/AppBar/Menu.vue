<template>
  <div>
    <v-btn
      class="ml-10 about"
      text
      small
      depressed
      to="/"
    >
      home
    </v-btn>
    <v-btn
      class="ml-1 about"
      text
      small
      depressed
      to="/about"
    >
      About
    </v-btn>
    <!-- Maps dropdown button -->

    <!-- <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          class="ml-1 about"
          text
          small
          depressed
          v-bind="attrs"
          v-on="on"
        >
          Maps
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Forza Horizon 5</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <v-menu open-on-hover offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          class="ml-1 about"
          text
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
          <v-list-item-title>
            Getting Started
          </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/stress">
          <v-list-item-title>
            Stress
          </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/changelog">
          <v-list-item-title>
            Changelog
          </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/compatibility">
          <v-list-item-title>
            Compatibility
          </v-list-item-title>
        </v-list-item>
        <v-divider />

        <v-divider />

        <v-subheader>External Links</v-subheader>
        <v-list-item>
          <v-list-item-title>
            <AppBarSocial />
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <AppBarGithub />
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
