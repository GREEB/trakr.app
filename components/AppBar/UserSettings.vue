<template>
  <v-card offset-x="true" color="accent">
    <v-card-title>User Settings</v-card-title>
    <v-card-subtitle>Basic User settings</v-card-subtitle>
    <v-list
      flat
      subheader
      three-line
    >
      <v-list-item>
        <v-btn
          block
          color="accent"
          @click="logout"
        >
          Logout
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
