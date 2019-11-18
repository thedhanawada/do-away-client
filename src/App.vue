<template>
  <div id="app">
    <notifications group="notify" class="notification-container" />
    <router-view></router-view>
    <div v-if="!hasAccepetedCookiePolicy" class="cookie-banner">
      <p>
        We use third party cookies to offer you a bug free application and analyze traffic to understand the useage of the application.
        <strong>We no means use this information to run advertisement. We hate customized ads as much as you do</strong>. Read our
        <a
          href="https://github.com/team-underscore/do-away-client/wiki/COOKIE-POLICY"
          target="blank"
        >cookie policy</a>
      </p>
      <button class="button button-dark" @click="cookieAccepted">Accept</button>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.min.css";
import "./assets/styles.css";

export default {
  name: "app",
  data() {
    return {
    hasAccepetedCookiePolicy :localStorage.getItem("_doaway_cookie_accepted")
    }
  },
  methods: {
    cookieAccepted() {
      localStorage.setItem("_doaway_cookie_accepted", true);
      this.hasAccepetedCookiePolicy = true;
    }
  }
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

.cookie-banner {
  width: 100vw;
  background-color: var(--primary-color);
  text-align: center;
  position: sticky;
  bottom: 0px;
  padding: 40px;
  text-align: left;
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
