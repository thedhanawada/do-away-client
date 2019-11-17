import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

import routes from './routes';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Notifications)

const router = new VueRouter({
  mode: 'hash',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
