<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mx-2 settingsBtn"
        fab
        dark
        x-small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-wrench
        </v-icon>
      </v-btn>
    </template>

    <v-card offset-x="true">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-switch
            v-model="gui"
            label="lil gui"
            @change="toggleGui"
          />
        </v-list-item>
        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            :label="$vuetify.theme.dark ? 'Darkmode' : 'Lightmode'"
            persistent-hint
            @click="setThreeBG"
          />
        </v-list-item>
        <v-list-item>
          <v-btn
            class="about"
            text
            small
            depressed
            to="/stress"
          >
            Stress
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            href="http://github.com/greeb/trakr.app"
            small
            icon
            color="#fff"
            class="mr-1"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />

        <v-btn
          icon
          @click="menu = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {

  data: () => ({
    gg: null,
    fav: true,
    menu: false,
    message: false,
    gui: false
  }),
  mounted () {
    const gui = this.$cookies.get('gui')
    if (gui === true) {
      this.gui = true
      const el = document.querySelector('.gui')
      el.style.display = 'block'
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
        this.$stage.setBackgroundColor('#1E1E1E')
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
      this.$stage.setBackgroundColor('#1E1E1E')
    },
    setLight () {
      this.$vuetify.theme.dark = false
      document.getElementsByClassName('lil-gui root')[0].classList.add('light')
      this.$stage.setBackgroundColor(this.$vuetify.theme.themes.light.background)
    },
    toggleGui (w) {
      const el = document.querySelector('.gui').parentElement
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
<style lang="sass" scoped>
settingsBtn
  position: absolute
</style>
