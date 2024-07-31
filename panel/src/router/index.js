import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';
import jwt_decode from 'jwt-decode';

import DashboardPage from '../views/DashboardPage.vue'
import LoginApp from '../views/LoginPage.vue';
import RegisterCollaboratorPage from '../views/Collaborators/RegisterCollaboratorPage.vue';
import IndexCollaboratorPage from '../views/Collaborators/IndexCollaboratorPage.vue';
import EditCollaboratorPage from '../views/Collaborators/EditCollaboratorPage.vue';

import CreateProductsPage from '../views/Products/CreateProductsPage.vue';
import IndexProductPage from '../views/Products/IndexProductPage.vue';
import EditProductsPage from '../views/Products/EditProductsPage.vue';
import GalleryProductsPage from '../views/Products/GalleryProductsPage.vue';

import CreateIncomePage from '../views/Incomes/CreateIncomePage.vue';
import IndexCategoryPage from '../views/Categories/IndexCategoryPage.vue';
import IndexIncomePage from '../views/Incomes/IndexIncomePage.vue';
import DetailsIncomePage from '../views/Incomes/DetailsIncomePage.vue';
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: LoginApp, meta: { requiresAuth: false }},
  { path: '/collaborator', name: 'index', component: IndexCollaboratorPage, meta: { requiresAuth: true }},
  { path: '/collaborator/register_admin', name: 'register', component: RegisterCollaboratorPage, meta: { requiresAuth: true }},
  { path: '/collaborator/user/edit/:id', name: 'edit', component: EditCollaboratorPage, meta: { requiresAuth: true }},
  { path: '/dashboard', name: 'dashboard', component: DashboardPage, meta: { requiresAuth: true }},

  // Rutas para productos
  {path: '/product/create', name: 'product-create', component: CreateProductsPage,  meta: { requiresAuth: true }},
  {path: '/product', name: 'product-index', component: IndexProductPage,  meta: { requiresAuth: true }},
  {path: '/product/edit/:id', name: 'product-edit', component: EditProductsPage,  meta: { requiresAuth: true }},
  {path: '/product/gallery/:id', name: 'product-gallery', component: GalleryProductsPage,  meta: { requiresAuth: true }},

  // Rutas de ingresos
  {path: '/income', name: 'income-index', component: IndexIncomePage,  meta: { requiresAuth: true }},
  {path: '/income/create', name: 'income-create', component: CreateIncomePage,  meta: { requiresAuth: true }},
  {path: '/categorias', name: 'categorias', component: IndexCategoryPage,  meta: { requiresAuth: true }},
  {path: '/income/:id', name: 'income-detail', component: DetailsIncomePage,  meta: { requiresAuth: true }},
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  //Validacion de rutas privadas
  if(to.matched.some(item => item.meta.requiresAuth)){
    if(!store.state.token){
      next({
        name: 'login'
      });
    }
    try {
      jwt_decode(store.state.token)
    } catch (error) {
      next({
        name: 'login'
      });
    }
    //Validacion si expira el token
    if(jwt_decode(store.state.token).exp*1000 <= new Date().getTime()){
      next({
        name: 'login'
      });
    }
    next();
    console.log(jwt_decode(store.state.token));
    console.log('privada');
  }else{
    console.log('publica');
    next();
  }
  console.log(to);
  console.log(from);
  
})

export default router
