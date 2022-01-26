<template>
  <v-container fluid class="toolbars ml-0 pl-0">
    <ToolBarCamera class="mb-3" />
    <ToolBarShader class="mb-3" />
    <ToolBarCar class="mb-3" />
  </v-container>
</template>
<script>
export default {
  data: () => ({
    camera: null
  })

}
</script>
<style>
.toolbarToolTips {
  background: rgba(34, 34, 34, 0.9);
  color: #FFFFFF;
  border-radius: 4px;
  font-size: 12px;
  line-height: 11px;
  display: inline-block;
  padding: 5px 7px;
  position: absolute;
  text-transform: none;
  text-transform: initial;
  width: auto;
  opacity: 0;
  pointer-events: none;
  margin: 0 auto;
  }
  .toolbars .v-speed-dial__list {
  height: 100%;
  top: 0;
  padding: 0;
}
/* .toolbars > div{
  margin-bottom: 3em
}

  #create .v-speed-dial {
    position: absolute;
  }
  #create .v-speed-dial__list {
    padding: 0 !important
  }
  #create .v-btn--floating {
    position: relative;
  } */
</style>
