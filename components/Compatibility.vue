<template>
  <v-col class="pa-0">
    <v-card
      style="width:100%"
      elevation="0"
    >
      <v-simple-table color="success">
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                UDP Url (click to copy)
              </th>
              <th class="text-left">
                Implemented packs
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, key) in games"
              :key="key"
            >
              <td>
                {{ item.gameName }}
              </td>
              <td>
                <code @click="copy2clip('trakr.app' + ':' + (parseInt(key) + 1024))">{{ 'trakr.app' + ':' + (parseInt(key) + 1024) }}</code>
                <!-- <code @click="copy2clip(item.slug + '.trakr.app' + ':' + (parseInt(key) + 1024))">{{ item.slug + '.trakr.app' + ':' + (parseInt(key) + 1024) }}</code> -->
              </td>
              <td>
                <a :href="`https://github.com/greeb/trakr.app/blob/main/assets/js/games/${item.slug}.js`">Check out parser file on github</a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-col>
</template>
<script>
import { games } from '~/assets/js/games'
export default {
  data () {
    return {
      games,
      menu: false
    }
  },
  methods: {
    copy2clip (url) {
      this.$toast.info('Copied url to clipboard')
      navigator.clipboard.writeText(url)
    }
  }
}
</script>
<style scoped>
td>code{
  cursor: pointer;
}
</style>
