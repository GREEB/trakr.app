<template>
  <v-card
    style="width:100%"
    elevation="0"
    color="transparent"
  >
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Implementation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in games"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.implementation }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      games: [
        {
          name: 'Forza Horizon 5',
          implementation: 'Simple'
        }
      ]
    }
  }
}
</script>
