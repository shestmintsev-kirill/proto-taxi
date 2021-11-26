import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize-scss';
import VueEllipseProgress from 'vue-ellipse-progress';
import { registerGlobals } from './js';

Vue.use(VueEllipseProgress);

Vue.config.productionTip = false;

registerGlobals();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
