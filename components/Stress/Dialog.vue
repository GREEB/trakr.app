<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="520"
  >
    <v-card>
      <v-card-title class="red--text text-h5">
        Watch out!
      </v-card-title>
      <v-card-text class="text-body-1">
        You can make your browser or even pc <strong>crash</strong>
      </v-card-text>

      <v-card-actions>
        <v-checkbox
          v-model="askAgain"
          class="pt-0 mt-0 pr-3 pl-3"
          label="Don't ask again"
          color="red"
          value="red"
          hide-details
        />
        <v-spacer />
        <v-btn
          color="green darken-1"
          text
          to="/"
        >
          Go back gome
        </v-btn>
        <v-btn
          text
          @click="letMeIn"
        >
          Let me in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    askAgain: null,
    dialog: false
  }),
  mounted () {
    const cookieRes = this.$cookies.get('stressaskAgain')
    if (cookieRes === undefined) {
      this.dialog = true
    } else {
      this.dialog = false
    }
  },
  methods: {
    letMeIn () {
      this.dialog = false
      if (this.askAgain) {
        this.$cookies.set('stressaskAgain', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 * 191

        })
      }
    }
  }
}
</script>
