<template>
  <div class="demo-container">
    <vue-scroll :ops="ops">
      <div class="demo-content">
        <span class="demo-content-text">Hello World</span>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ops: {} // Your options
    }
  }
}
</script>
