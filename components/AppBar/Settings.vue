<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mx-4"
        x-small
        fab
        v-bind="attrs"
        text
        value="Settings"
        v-on="on"
      >
        <v-badge
          color="warning"
          dot
          :content="showUDPbadge"
          :value="showUDPbadge"
        >
          <v-icon x-small>
            mdi-wrench
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card offset-x="true" color="accent">
      <v-app-bar
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 white--text pl-0">
          Settings
        </v-toolbar-title>
        <v-spacer />

        <v-spacer />

        <AppBarGithub />

        <v-badge
          v-if="$route.name !== 'register'"
          :content="showUDPbadge"
          :value="showUDPbadge"
          overlap
          color="warning"
          dot
        >
          <div v-if="(udpRegister === 'new')">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  dark
                  icon
                  small
                  color="accent"
                  to="/register"
                  v-on="on"
                >
                  <v-icon
                    :color="udpRegister ? 'warning': 'accent'"
                    :class="udpRegister ? 'pulse' : ''"
                    @click="menu = false"
                  >
                    {{ udpRegister ? 'mdi-car-light-high' : 'mdi-car-light-dimmed' }}
                  </v-icon>
                </v-btn>
              </template>
              <span>Register new Client</span>
            </v-tooltip>
          </div>
        </v-badge>
      </v-app-bar>
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
              color="accent"
              @change="toggleGui"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>lil gui aka dat.gui </v-list-item-title>
            <v-list-item-subtitle>Toggle lil gui mostly for development</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="$vuetify.theme.dark"
              color="accent"
              @click="setThreeBG"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Darkmode</v-list-item-title>
            <v-list-item-subtitle>Watch out flashbang effect is real</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-menu
              top
              offset-y
              :close-on-content-click="false"
            >
              <template #activator="{ on, attrs }">
                <v-sheet
                  :color="accentColor"
                  elevation="3"
                  height="34"
                  width="34"
                  v-bind="attrs"
                  rounded
                  class="rounded-xl"
                  v-on="on"
                />
              </template>

              <v-list>
                <v-list-item>
                  <v-color-picker
                    v-model="accentColor"
                    hide-inputs
                    hide-mode-switch
                    mode="hexa"
                    swatches-max-height="200"
                  />
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Accent Color</v-list-item-title>
            <v-list-item-subtitle>Change accent color of app</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
export default {

  data: () => ({
    logs: '',
    zIndex: 0,
    overlay: true,
    settings: [],
    gg: null,
    fav: true,
    menu: false,
    message: false,
    gui: false
  }),
  computed: {
    udpRegister () { return this.$store.state.udp.register },
    showUDPbadge () {
      if (this.$store.state.udp.register === 'new' && this.$route.name !== 'register') {
        return 1
      } else {
        return 0
      }
    },
    accentColor: {
      get () {
        if (this.$vuetify.theme.isDark) {
          return this.$vuetify.theme.themes.dark.accent
        } else {
          return this.$vuetify.theme.themes.light.accent
        }
      },
      set (val) {
        this.$vuetify.theme.themes.dark.accent = val
        this.$vuetify.theme.themes.light.accent = val
      }
    }
  },
  mounted () {
    const gui = this.$cookies.get('gui')
    if (gui === true) {
      this.gui = true
    } else {
      this.gui = false
    }
  },
  methods: {
    setThreeBG () {
      if (this.$vuetify.theme.dark) {
        document.getElementsByClassName('lil-gui root')[0].classList.remove('light')
        this.$stage.setBackgroundColor('#121212')
        this.$cookies.set('theme', 'dark', { path: '/', maxAge: 60 * 60 * 24 * 7 * 191 })
      } else {
        document.getElementsByClassName('lil-gui root')[0].classList.add('light')
        this.$stage.setBackgroundColor('#ffffff')
        this.$cookies.set('theme', 'light', { path: '/', maxAge: 60 * 60 * 24 * 7 * 191 })
      }
    },
    toggleGui (w) {
      // FIXME: lil gui can be shown if not on a three page
      // category=lilgui
      // The system to show or hide gui+stage stuff is not optimal
      // For now we give a mixin to pages we want the gui that show and hide on mount/destroy

      if (w) {
        this.$cookies.set('gui', true, { path: '/', maxAge: 60 * 60 * 24 * 7 * 191 })
        document.getElementsByClassName('guicontainer')[0].classList.remove('hide')
      } else {
        this.$cookies.set('gui', false, { path: '/', maxAge: 60 * 60 * 24 * 7 * 191 })
        document.getElementsByClassName('guicontainer')[0].classList.add('hide')
      }
    }
  }
}
</script>
