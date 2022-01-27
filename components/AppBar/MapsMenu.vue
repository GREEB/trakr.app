<template>
  <v-menu open-on-hover offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        small
        depressed
        v-bind="attrs"
        v-on="on"
      >
        Maps
        <v-icon class="ml-1" small>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-list dense class="pa-0">
      <v-list-item
        v-for="(game, key) in games"
        :key="key"
        :to="'/m/' + game.slug"
      >
        <v-list-item-title>
          {{ game.gameName }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { games } from '~/assets/js/games'
export default {
  data: () => ({
    games
  })
}
</script>
