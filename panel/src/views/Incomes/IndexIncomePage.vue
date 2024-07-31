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
                                                <a class="nav-link active">Ingresos</a>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/income/create" class="nav-link ">Nuevo ingreso</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
            </div>

            <div class="row mb-5">
    <div class="col-9 d-flex">
        <input type="date" class="form-control" v-model="start" style="margin-right: 1rem"/>
        <input type="date" class="form-control" v-model="end"/>
    </div>
    <div class="col">
        <button class="btn btn-primary" style="width:100%" v-on:click="init_data()">Buscar</button>
    </div>
</div>

<div class="card">
    <div class="card-header">

        <!-- Title -->
        <h4 class="card-header-title mb-0">
            <b>Ingreso a inventario</b>
        </h4>

    </div>
    <div class="table-responsive">
        <table class="table table-sm table-nowrap card-table">
        <thead>
            <tr>
            <th>Proveedor</th>
            <th>Serie</th>
            <th>Monto</th>
            <th>Documento</th>
            <th>*</th>
            </tr>
        </thead>
        <tbody class="fs-base" v-if="incomes.length >= 1">
            <tr v-for="item in incomes">
                <td>
                    <a>{{ item.supplier }}</a>
                </td>
                <td>
                    <a># {{ item.series }}</a>
                </td>
                <td>
                    {{ convertCurrency(item.total_amount) }}
                </td>
                <td>
                    <a :href="$url+'/get_frontPage_income/'+item.document" target="_blank">
                        <span class="badge bg-success">Abrir documento</span>
                    </a>
                </td>
                <td>
                    <button class="btn btn-primary btn-sm">
                        <router-link style="color: white;" :to="{name: 'income-detail', params: {id: item._id}}">ver detalles</router-link>
                    </button>
                    
                </td>
            </tr>
            
        </tbody>
        <tbody v-if="incomes.length == 0">
            <tr>
                <td colspan="4">
                    <div class="row justify-content-center">
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
import SidebarPage from '../../components/SidebarPage.vue';
import TopNavPage from '../../components/TopNavPage.vue';
import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
  name: 'IndexIncomePage',
    data(){
        return {
            start: '',
            end: '',
            incomes: [],
        }
    },

  methods: {
    init_data(){
        if(!this.start){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese la fecha de inicio',
                type: 'error'
            });
        }else if(!this.end){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese la segunda fecha',
                type: 'error'
            });
        }else{
            axios.get(this.$url+'/get_income_admin/'+this.start+'/'+this.end, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
            } 
            }).then( (result) => {
                console.log(result);
                this.incomes = result.data;
                
            }).catch( (err) => {
                console.log(err);
            })
        }
    },

    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    }
  },
  beforeMount(){
    
  },

  components: {
        SidebarPage,
        TopNavPage
    },
}
</script>
