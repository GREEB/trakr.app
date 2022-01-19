<template>
  <div>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          x-small
          color="grey"
          v-bind="attrs"
          target="_blank"
          :href="bugurl"
          v-on="on"
        >
          <v-icon>mdi-bug</v-icon>
        </v-btn>
      </template>
      <span>Report Bug</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  data: () => ({
    gitIssueUrl: 'https://github.com/GREEB/trakr.app/issues/new?assignees=&labels=&template=bug_report.md&title='
  }),
  computed: {
    bugurl () {
      return this.gitIssueUrl + encodeURIComponent('Issue on: /' + this.$route.name)
    }
  }
}
</script>
