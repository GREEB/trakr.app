<template>
  <div class="ThreeContainer">
    <PointCloud />
    <RegisterClient />
  </div>
</template>
<script>
export default {
  middleware: 'isAuthenticated'
}
</script>
