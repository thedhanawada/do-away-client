<template>
  <div id="app">
    <notifications group="notify" class="notification-container" />
    <router-view></router-view>
  </div>
</template>

<script>
import "bulma/css/bulma.min.css";
import './assets/styles.css';

export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.notification-container {
  margin: 16px;
}

.vue-notification {
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;
  background: var(--secondary-color) !important;
  border-left-color: var(--primary-color) !important;
  border: 2px solid #5a584c;
  border-radius: 8px;
  color: #121210 !important;
  font-size: 16px !important;
}

.vue-notification.warn {
   border-left-color: var(--warn-color) !important;
}


.vue-notification.error {
   border-left-color: var(--error-color) !important;
}


.vue-notification.success {
   border-left-color: var(--success-color) !important;
}
</style>
