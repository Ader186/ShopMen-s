import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification';
import VuePaginate from 'vue-paginate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "vue-search-select/dist/VueSearchSelect.css"
import { ModalPlugin } from 'bootstrap-vue';

Vue.use(VuePaginate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin);
Vue.use(Notifications);
Vue.config.productionTip = false

//Para usar la url servidor
Vue.prototype.$url = 'http://localhost:4200/api';

// Margen de ganancia
Vue.prototype.$revenue = 30;

//Para obtener el token de acceso
Vue.prototype.$token = localStorage.getItem('token');

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
