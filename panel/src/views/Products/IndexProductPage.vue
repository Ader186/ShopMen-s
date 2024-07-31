<template>
  <div>
    <SidebarPage></SidebarPage>
    <div class="main-content">
      <TopNavPage></TopNavPage>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">

            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">Productos</h6>
                    <!-- Title -->
                    <h1 class="header-title"> Nuevo producto</h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">Todos los productos</a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/product/create" class="nav-link">Nuevo producto</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">

                <!-- Files -->
                <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                  <div class="card-header">

                    <!-- Title -->
                    <h4 class="card-header-title">
                      Productos
                    </h4>

                    <!-- Button -->
                    <a href="#!" class="btn btn-sm btn-primary text-white">
                      Nuevo producto
                    </a>

                  </div>
                  <div class="card-header">
                    <div class="input-group input-group-flush input-group-merge input-group-reverse">

                      <!-- Input -->
                      <input class="form-control list-search" type="search" placeholder="Busca tu producto"
                        v-model="filter">

                      <!-- Prepend -->
                      <div class="input-group-text" style="cursor: pointer" v-on:click="init_data()">
                        <span class="fe fe-search"></span>
                      </div>

                    </div>

                  </div>
                  <div class="card-body">

                    <template v-if="load_data">
                      <div>
                        <div class="row">
                          <div class="col-12 text-center">
                            <div class="spinner-border mt-5 mb-5 text-info" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="!load_data">
                      <div>
                        <!-- List -->
                        <ul id="my-table" class="list-group list-group-lg list-group-flush list my-n4" v-if="products.length >= 1">
                          <li class="list-group-item" v-for="item in itemsForList">
                            <div class="row align-items-center">
                              <div class="col-auto">

                                <!-- Avatar -->
                                <a href="#!" class="avatar avatar-lg">
                                  <img :src="$url + '/get_frontPage_product/' + item.frontPage" alt="..."
                                    class="avatar-img rounded">
                                </a>

                              </div>
                              <div class="col ms-n2">

                                <!-- Title -->
                                <h4 class="mb-1 name">
                                  <a href="#!">{{ item.title }}</a>
                                </h4>

                                <!-- Text -->
                                <p class="card-text small text-muted mb-1">
                                  {{ item.category }} &nbsp;
                                  <span v-if="!item.state" class="item-score badge bg-danger-soft">Borrador</span>
                                  <span v-if="item.state" class="item-score badge bg-success-soft">Publicado</span>
                                </p>

                                <!-- Time -->
                                <p class="card-text small text-muted">
                                  Creación <time datetime="2018-01-03">{{ convertData(item.createdAt) }}</time>
                                </p>

                              </div>
                              <div class="col-auto">
                                <span><b>{{ convertCurrency(item.price) }}</b></span>

                              </div>
                              <div class="col-auto">

                                <!-- Dropdown -->
                                <div class="dropdown">
                                  <a href="#" class="dropdown-ellipses dropdown-toggle" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-end">
                                    <router-link :to="{ name: 'product-edit', params:{id:item._id}}" class="dropdown-item">
                                      Editar Producto
                                    </router-link>
                                    <router-link :to="{ name: 'product-gallery', params:{id:item._id}}" class="dropdown-item">
                                      Galeria de producto
                                    </router-link>
                                  </div>
                                </div>

                              </div>
                            </div> <!-- / .row -->
                          </li>
                        </ul>

                        <div class="row justify-content-center" v-if="products.length == 0">
                          <div class="col-12 col-md-6 col-xl-6 my-5">

                            <div class="text-center">

                              <!-- Preheading -->
                              <h6 class="text-uppercase text-muted mb-4">
                                404 error
                              </h6>

                              <!-- Heading -->
                              <h1 class="display-4 mb-3">
                                No se encontraron registros 😭
                              </h1>

                              <!-- Subheading -->
                              <p class="text-muted mb-4">
                                Looks like you ended up here by accident?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                  </div>

                  <div class="card-fotter">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="products.length"
                        :per-page="perPage"
                        aria-controls="my-table"
                    ></b-pagination>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
import SidebarPage from '../../components/SidebarPage.vue';
import TopNavPage from '../../components/TopNavPage.vue';
import currency_formatter from 'currency-formatter';
import moment from 'moment'
import axios from 'axios';

export default {
  name: 'IndexProductPage',
  data() {
    return {
      products: [],
      filter: '',
      load_data: false,
      currentPage: 1,
      perPage: 10,
      get itemsForList(){
        return this.products.slice(
            (this.currentPage-1) * this.perPage, this.currentPage * this.perPage
        )
      }
    }
  },

  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + '/get_products/' + this.filter, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result) => {
        this.products = result.data;
        this.load_data = false;
        console.log(this.products);
      }).catch((err) => {
        console.log(err);
      })
    },

    convertData(data) {
      return moment(data).format('YYYY-MM-DD');
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    }
  },
  components: {
    SidebarPage,
    TopNavPage
  },

  beforeMount() {
    this.init_data();
  }
}
</script>
