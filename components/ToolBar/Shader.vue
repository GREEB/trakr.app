<template>
  <v-speed-dial
    v-model="car"
    direction="right"
    style="width: fit-content;"
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
      <v-card>
        <v-card-title>Shaders</v-card-title>
        <v-card-subtitle>Customize the running shader if it fails to run you won't see anything</v-card-subtitle>
        <v-card-text>
          Read more about shaders <a href="https://thebookofshaders.com/">here</a>. This is VWIP, in the future there will be a api reference and you will be able to use every parameter to build whatever you want.
          <pre @click.stop="">
        <code v-highlight contenteditable="true" class="javascript" @input="onInputFragment">{{ inputFragment }}</code>
      </pre>
          <pre @click.stop="">
        <code v-highlight contenteditable="true" class="javascript" @input="onInputVertex">{{ inputVertex }}</code>
      </pre>
        </v-card-text>
      </v-card>
    </v-container>
  </v-speed-dial>
</template>
<script>
export default {
  data: () => ({
    car: null,
    inputFragment: null,
    inputVertex: null,
    code: 'null'
  }),
  computed: {
    fragmentShader () {
      if (this.$stage !== undefined) {
        return this.$stage.defaultFragment
      } else {
        return 0
      }
    },
    vertexShader () {
      if (this.$stage !== undefined) {
        return this.$stage.defaultVertex
      } else {
        return 0
      }
    }
  },
  mounted () {
    this.inputFragment = this.fragmentShader
    this.inputVertex = this.vertexShader
  },
  methods: {
    onInputFragment (val) {
      this.$stage.material.fragmentShader = val.target.innerText
      this.$stage.updateMaterial()
    },
    onInputVertex (val) {
      this.$stage.material.vertexShader = val.target.innerText
      this.$stage.updateMaterial()
    }
  }
}
</script>
<style scoped>
.shaderContainer .v-card{
    background-color: rgba(0, 0, 0, 0.418);
}
.shaderContainer{
    position: absolute;
    top:0;
    left:0;
    width: fit-content
}
pre{
width: fit-content;

}
code{
        background: rgba(0, 0, 0, 0.418);

}
</style>
