<template>
  <v-container fluid />
</template>
<script>
import guiController from '../mixin/guiController'
import stageController from '../mixin/stageController'

export default {
  mixins: [guiController, stageController],
  middleware: 'isFirstVisit',
  data () {
    return {
      interval: null
    }
  },
  head: {
    title: 'Home'
  }
}
</script>
