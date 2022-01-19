<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="100"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        fab
        dark
        x-small
        color="accent"

        v-bind="attrs"
        v-on="on"
      >
        <v-icon x-small>
          mdi-wrench
        </v-icon>
      </v-btn>
    </template>
    <v-card offset-x="true" color="accent">
      <v-card-title>App Settings</v-card-title>
      <v-card-subtitle>Basic App settings</v-card-subtitle>
      <v-list
        flat
        subheader
        three-line
      >
        <v-subheader>General</v-subheader>

        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="gui"
              @change="toggleGui"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>lil gui aka dat.gui </v-list-item-title>
            <v-list-item-subtitle>Toggle lil gui mostly for devlopment</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="$vuetify.theme.dark"
              @click="setThreeBG"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Darkmode</v-list-item-title>
            <v-list-item-subtitle>Watch out flashbang effect is real</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
export default {

  data: () => ({
    settings: [],
    gg: null,
    fav: true,
    menu: false,
    message: false,
    gui: false
  }),
  mounted () {
    const gui = this.$cookies.get('gui')
    const el = document.querySelector('.gui')
    if (gui === true) {
      this.gui = true
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }

    const theme = this.$cookies.get('theme')
    if (theme !== undefined) {
      if (theme === 'dark') {
        this.setDark()
      } else {
        this.setLight()
      }
    }
  },
  methods: {
    setThreeBG () {
      if (this.$vuetify.theme.dark) {
        document.getElementsByClassName('lil-gui root')[0].classList.remove('light')
        this.$stage.setBackgroundColor('#121212')
        this.$cookies.set('theme', 'dark', { path: '/', maxAge: 60 * 60 * 24 * 7 })
      } else {
        document.getElementsByClassName('lil-gui root')[0].classList.add('light')
        this.$stage.setBackgroundColor('#ffffff')
        this.$cookies.set('theme', 'light', { path: '/', maxAge: 60 * 60 * 24 * 7 })
      }
    },
    setDark () {
      this.$vuetify.theme.dark = true
      document.getElementsByClassName('lil-gui root')[0].classList.remove('light')
      this.$stage.setBackgroundColor('#121212')
    },
    setLight () {
      this.$vuetify.theme.dark = false
      document.getElementsByClassName('lil-gui root')[0].classList.add('light')
      this.$stage.setBackgroundColor(this.$vuetify.theme.themes.light.background)
    },
    toggleGui (w) {
      const el = document.querySelector('.gui')
      if (w) {
        this.$cookies.set('gui', true, { path: '/', maxAge: 60 * 60 * 24 * 7 })
        el.style.display = 'block'
      } else {
        this.$cookies.set('gui', false, { path: '/', maxAge: 60 * 60 * 24 * 7 })
        el.style.display = 'none'
      }
    }
  }
}
</script>
