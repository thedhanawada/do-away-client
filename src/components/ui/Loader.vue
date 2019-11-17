<template>
  <div class="loader-wrapper">
    <div class="loader-container">
      <p><span class="loader"></span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loader"
};
</script>
<style scoped>
.loader-wrapper {
  width: 100vw;
  height: 100vh;
  padding: 16px;
  background: var(--primary-color);
}

.loader-container {
  font-size: 24px;
}
</style>