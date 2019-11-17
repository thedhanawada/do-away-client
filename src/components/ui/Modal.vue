<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  methods: {
    closeModal() {
      this.$emit("onclose");
    }
  }
};
</script>
<style scoped>
.modal-background {
  background-color: var(--primary-color);
}

.modal-card,
.modal-content {
  border: 4px solid var(--dark-color);
  border-radius: 8px;
  border-bottom: 8px solid var(--dark-color);
  border-left: 8px solid var(--dark-color);
  background-color: var(--secondary-color);
  min-height: 220px;
}
</style>