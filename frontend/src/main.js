import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io'
import  SocketIO from 'socket.io-client';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const socketConnection = SocketIO('http://localhost:4200');

Vue.config.productionTip = false
Vue.use(BootstrapVue);

//-----------SOCKET--------------//
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))
//---------------------------------------//
Vue.prototype.$envio = 20;
Vue.prototype.$country = ['Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama']
//Para usar la url servidor
Vue.prototype.$url = 'http://localhost:4200/api';

//Para obtener el token de acceso
Vue.prototype.$token = localStorage.getItem('token');
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
