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
                UDP Url
              </th>
              <th class="text-left">
                Implemented packs
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in games"
              :key="item.name"
            >
              <td>
                {{ item.name }}
              </td>
              <td>
                <code v-if="$config.dev" @click=" $toast.info('Copied url to clipboard')">{{ item.url + ':' + item.port }}</code>
              </td>
              <td>
                <v-chip-group
                  active-class="noactive"
                  style
                  column
                >
                  <div
                    v-for="(packs, packName) in item.packs"
                    :key="packName"
                  >
                    <v-menu
                      :v-model="packName"
                      bottom
                      right
                      transition="scale-transition"
                      origin="top left"
                    >
                      <template #activator="{ on }">
                        <v-chip
                          small
                          pill
                          color="#2f2f2f"
                          v-on="on"
                        >
                          <v-avatar left>
                            <v-icon>{{ packs.info.icon }}</v-icon>
                          </v-avatar>
                          {{ packName }}
                        </v-chip>
                      </template>
                      <v-card width="300">
                        <v-list dark class="pa-0">
                          <v-list-item>
                            <v-list-item-avatar>
                              <v-icon>{{ packs.info.icon }}</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>{{ packName }}</v-list-item-title>
                              <v-list-item-subtitle>{{ packs.info.description }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <v-divider />
                        <v-list>
                          <v-list-item>
                            <v-list-item-subtitle>
                              <pre><code v-highlight class="json">{{ packs.data }}</code></pre>
                            </v-list-item-subtitle>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </v-chip-group>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-col>
</template>
<script>
import games from '~/games.json'
export default {
  data () {
    return {
      games,
      menu: false
    }
  }
}
</script>
<style scoped>
td>code{
  cursor: pointer;
}
table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #282828 !important
}
</style>
