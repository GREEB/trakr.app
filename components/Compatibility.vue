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
              <th class="text-left" />
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
                <code v-highlight @click="copy2clip('trakr.app' + ':' + (parseInt(key) + 1024))">{{ 'trakr.app' + ':' + (parseInt(key) + 1024) }}</code>
                <!-- <code @click="copy2clip(item.slug + '.trakr.app' + ':' + (parseInt(key) + 1024))">{{ item.slug + '.trakr.app' + ':' + (parseInt(key) + 1024) }}</code> -->
              </td>
              <td>
                <a :href="`https://github.com/greeb/trakr.app/blob/main/assets/js/games/${item.slug}.js`">{{ `${item.slug}.js` }}</a>
              </td>
              <td>
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="accent"
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      How to Connect
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      dark
                      color="accent"
                    >
                      <v-btn
                        icon
                        dark
                        @click="dialog = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ `How to connect to ${item.gameName}` }}</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                      <!-- just as a quick fix this needs better implementation -->
                      <iframe
                        width="100%"
                        style="height: calc(100vh -  128px)"
                        src="https://www.youtube.com/embed/6e_MtHs6ANg"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      />
                    </v-card-text>
                  </v-card>
                </v-dialog>
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
      dialog: false,
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
