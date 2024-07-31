import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LoginUserPage from '../views/LoginUserPage.vue';
import IndexProductsPage from '../views/Products/IndexProductsPage.vue';
import ShowProductsPage from '../views/Products/ShowProductsPage.vue';
import ShoppingCarPage from '../views/Products/ShoppingCarPage.vue';

import AddressPage from '../views/Address/AddressPage.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import VerificationPage from '../views/VerificationPage.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginUserPage },
  { path: '/shop', name: 'shop', component: IndexProductsPage },
  { path: '/produt/:slug', name: 'product-shop', component: ShowProductsPage },
  { path: '/shopping', name: 'shopping-car', component: ShoppingCarPage },


  // rutas para direcciones
  { path: '/cuenta/direcciones', name: 'direccion', component: AddressPage },

  // rutas para mercado pago
  { path: '/checkout', name: 'checkout', component: CheckoutPage},

  { path: '/verify/:state', name: 'verify', component: VerificationPage},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
