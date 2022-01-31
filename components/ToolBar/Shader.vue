<template>
  <v-speed-dial
    v-model="car"
    direction="right"
    style="width: fit-content"
    :close-on-content-click="false"
  >
    <template #activator>
      <v-tooltip bottom content-class="toolbarToolTips">
        <template #activator="{ on, attrs }">
          <v-btn
            v-model="car"
            v-bind="attrs"
            color="secondary"
            dark
            small
            class="pa-0 ma-0 rounded-0"
            v-on="on"
          >
            <v-icon small>
              mdi-shape-plus
            </v-icon>
          </v-btn>
        </template>
        <span>Shaders</span>
      </v-tooltip>
    </template>
    <v-container class="shaderContainer">
      <div class="scrollContainer">
        <vue-scroll :ops="ops">
          <v-card>
            <v-card-title>Shaders</v-card-title>
            <v-card-subtitle>
              Customize the running shader in real time, buggy atm
            </v-card-subtitle>
            <v-card-text>
              Read more about shaders
              <a href="https://thebookofshaders.com/">here</a>. This is VWIP, in
              the future there will be a api reference and you will be able to
              use every parameter to build whatever you want.
            </v-card-text>

            <pre class="mx-4" @click.stop="">
              <p class="codetitle">fragment.glsl</p>
              <code v-highlight spellcheck="false" contenteditable="true" class="c" @input="onInputFragment">{{ inputFragment }}</code>
              </pre>
            <pre class="mx-4" @click.stop="">
              <p class="codetitle">vertex.glsl</p>
                <code v-highlight spellcheck="false" contenteditable="true" class="c" @input="onInputVertex">{{ inputVertex }}</code>
            </pre>
            <v-card-actions>
              <v-btn @click="save()">
                save
              </v-btn>
              <v-btn @click="reset()">
                reset
              </v-btn>
            </v-card-actions>
          </v-card>
        </vue-scroll>
      </div>
    </v-container>
  </v-speed-dial>
</template>
<script>
export default {
  // TODO: Actually implement real code editor for shaders don't use this v-menu actual dialog should be used
  // category=nuxt
  // Also this needs saving to db and sharing and much more a pre made library...
  data: () => ({
    ops: {
      bar: {
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: '#151515 ',
        opacity: 1,
        minSize: 0,
        size: '6px'
      }
    },
    car: null,
    inputFragment: null,
    inputVertex: null,
    defaultFragment: null,
    defaultVertex: null,
    code: 'null'
  }),
  computed: {
    fragmentShader () {
      if (this.$stage !== undefined) {
        return this.$stage.material.fragmentShader
      } else {
        return 0
      }
    },
    vertexShader () {
      if (this.$stage !== undefined) {
        return this.$stage.material.vertexShader
      } else {
        return 0
      }
    }
  },
  mounted () {
    this.inputFragment = this.$stage.material.fragmentShader
    this.inputVertex = this.$stage.material.vertexShader
    this.defaultFragment = this.$stage.material.fragmentShader
    this.defaultVertex = this.$stage.material.vertexShader
  },
  methods: {
    onInputFragment (val) {
      this.$stage.material.fragmentShader = val.target.innerText
      this.$stage.updateMaterial()
    },
    onInputVertex (val) {
      this.$stage.material.vertexShader = val.target.innerText
      this.$stage.updateMaterial()
    },
    save () {
      this.inputFragment = this.$stage.material.fragmentShader
      this.inputVertex = this.$stage.material.vertexShader
    },
    reset () {
      this.inputFragment = this.defaultFragment
      this.inputVertex = this.defaultVertex
      this.$stage.updateMaterial()
    }
  }
}
</script>
<style lang="sass" scoped>
.codetitle 
  position: absolute
  font-size: 10px
.shaderContainer .v-card 
  background-color: rgba(0, 0, 0, 0.418)
.scrollContainer 
  position: relative
  height: calc(100vh - 200px)
.shaderContainer 
  position: absolute
  top: 0
  left: 0
  width: fit-content
  height: calc(100vh - 200px)
pre
  width: fit-content
code
  resize: both
  max-width: 1101px
  background: rgba(0, 0, 0, 0.418)
</style>
