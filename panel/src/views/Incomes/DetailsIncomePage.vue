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
                                        <h6 class="header-pretitle">Ingreso</h6>
                                        <!-- Title -->
                                        <h1 class="header-title">Ingresos</h1>
                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link to="/income" class="nav-link">Ingresos</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/income/create" class="nav-link ">Nuevo ingreso</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
            </div>

            <div class="row">
    <div class="col-12 col-md-6">
        <div class="card">
        <div class="card-body">

            <!-- List group -->
            <div class="list-group list-group-flush my-n3" >
            <div class="list-group-item">
                <div class="row align-items-center">
                <div class="col">

                    <!-- Title -->
                    <h5 class="mb-0">Proveedor</h5>

                </div>
                <div class="col-auto">

                    <!-- Time -->
                    <time class="small text-muted" datetime="1988-10-24">
                        {{ income.supplier }}
                    </time>

                </div>
                </div> <!-- / .row -->
            </div>
            <div class="list-group-item">
                <div class="row align-items-center">
                <div class="col">

                    <!-- Title -->
                    <h5 class="mb-0">
                    Comprobante
                    </h5>

                </div>
                <div class="col-auto">

                    <!-- Time -->
                    <time class="small text-muted" datetime="2018-10-28">
                    {{ income.nvoucher }}
                    </time>

                </div>
                </div> <!-- / .row -->
            </div>
            <div class="list-group-item">
                <div class="row align-items-center">
                <div class="col">

                    <!-- Title -->
                    <h5 class="mb-0">
                    Serie
                    </h5>

                </div>
                <div class="col-auto">

                    <!-- Text -->
                    <small class="text-muted">
                    {{ income.series }}
                    </small>

                </div>
                </div> <!-- / .row -->
            </div>
            
            </div>

        </div>
        </div>
    </div>
    <div class="col-12 col-md-6">
        <div class="card">
            <div class="card-body">

                <!-- List group -->
                <div class="list-group list-group-flush my-n3">
                <div class="list-group-item">
                    <div class="row align-items-center">
                    <div class="col">

                        <!-- Title -->
                        <h5 class="mb-0">
                        Monto totla
                        </h5>

                    </div>
                    <div class="col-auto">

                        <!-- Time -->
                        <time class="small text-muted" datetime="1988-10-24">
                        {{ convertCurrency(income.total_amount) }}
                        </time>

                    </div>
                    </div> <!-- / .row -->
                </div>
                <div class="list-group-item">
                    <div class="row align-items-center">
                    <div class="col">

                        <!-- Title -->
                        <h5 class="mb-0">
                        Monto resultante
                        </h5>

                    </div>
                    <div class="col-auto">

                        <!-- Time -->
                        <time class="small text-muted" datetime="2018-10-28">
                        {{ convertCurrency(income.resulting_amount) }}
                        </time>

                    </div>
                    </div> <!-- / .row -->
                </div>
                <div class="list-group-item">
                    <div class="row align-items-center">
                    <div class="col">

                        <!-- Title -->
                        <h5 class="mb-0">
                        Fecha
                        </h5>

                    </div>
                    <div class="col-auto">

                        <!-- Text -->
                        <small class="text-muted">
                        {{ convertDate(income.createdAt) }}
                        </small>

                    </div>
                    </div> <!-- / .row -->
                </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">

        <!-- Title -->
        <h4 class="card-header-title mb-0">
            <b>Productos</b>
        </h4>

    </div>
    <div class="table-responsive">
        <table class="table table-sm table-nowrap card-table">
        <thead>
            <tr>
            <th>Producto</th>
            <th>Variedad</th>
            <th>Precio</th>
            <th>Cantidad</th>
            </tr>
        </thead>
        <tbody class="fs-base">
            <tr v-for="item in details">
                <td>
                    <a>{{ item.product.title }}</a>
                </td>
                <td>
                    <span >{{ item.product.variety}}</span>
                </td>
                <td>
                    <time>{{ convertCurrency(item.product.price) }}</time>
                </td>
                <td>
                    {{ item.amount }}
                </td>
                
            </tr>
        </tbody>
        </table>
    </div>
                        </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import SidebarPage from '../../components/SidebarPage.vue';
import TopNavPage from '../../components/TopNavPage.vue';
import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'DetailsIncomePage',
  data(){
    return {
        income: {},
        details: [],
    }
  },

  methods: {
    init_data(){
        axios.get(this.$url+'/get_income_details/'+this.$route.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
            } 
            }).then( (result) => {
                console.log(result);
                this.income = result.data.income;
                this.details = result.data.income_details
            }).catch( (err) => {
                console.log(err);
            })
    },

    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    },

    convertDate(item){
        return moment(item).format('YYYY/MM/DD');
    }
  },

  beforeMount(){
    this.init_data();
  },

  components: {
        SidebarPage,
        TopNavPage
    },


}
</script>
