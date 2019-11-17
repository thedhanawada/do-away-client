<template>
  <div class="empty-state-container">
    <div class="empty-state-body">
      <ion-icon :name="icon" size="large"></ion-icon>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Empty",
  props: {
    text: {
      type: String,
      default: "Empty Here"
    },
    icon: {
      type: String,
      default: "paper-plane" 
    }
  },
};
</script>
<style scoped>
.empty-state-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.empty-state-body {
  color: var(--dark-color);
  width: 150px;
  height: 150px;
  margin: auto;
  background-color: var(--secondary-color);
  border-radius: 8px;
  box-shadow: -8px -8px var(--primary-color);
  padding: 44px 0px;
}
</style>