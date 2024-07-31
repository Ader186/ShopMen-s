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
                                        <h6 class="header-pretitle">Usuarios</h6>
                                        <!-- Title -->
                                        <h1 class="header-title"> Nuevo colaborador</h1>
                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link active">Todos los colaboradores</a>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/collaborator/register_admin" class="nav-link">Nuevo colaborador</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-content">
                        <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel" aria-labelledby="contactsListTab">

                <!-- Card -->
                <div class="card" data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="contactsList">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Form -->
                        <form>
                          <div class="input-group input-group-flush input-group-merge input-group-reverse">
                            <input class="form-control list-search" type="search" v-model="filter" placeholder="Buscar usuario">
                            <span class="input-group-text">
                              <i class="fe fe-search"></i>
                            </span>
                          </div>
                        </form>
                      </div>
                      <div class="col-auto">
                        <!-- Dropdown -->
                        <button class="btn btn-sm btn-white" type="button" v-on:click="filtrar()">
                          <i class="fe fe-sliders me-1"></i> Filter <span class="badge bg-primary ms-1 d-none">0</span>
                        </button>

                      </div>
                    </div> <!-- / .row -->
                  </div>
                  <div class="table-responsive">
                    <table class="table table-sm table-hover table-nowrap card-table">
                      <thead>
                        <tr>
                          <th><a class="list-sort text-muted">Nombre</a>
                          </th>
                          <th><a class="list-sort text-muted">Cargo</a>
                          </th>
                          <th><a class="list-sort text-muted">Email</a>
                          </th>
                          <th><a class="list-sort text-muted">Estado</a>
                          </th>
                          <th><a class="list-sort text-muted">Acciones</a>
                          </th>
                        </tr>
                      </thead>
                      <paginate tag="tbody" ref="users" name="users" :list="users" :per="perPage" class="list">
                        <tr  v-if="!load_date" v-for="item in paginated('users')">
                          <td>
                            <!-- Avatar -->
                            <div class="avatar avatar-xs align-middle me-2">
                              <img class="avatar-img rounded-circle" src="assets/img/avatar-1.jpg" alt="...">
                            </div> <a class="item-name text-reset">{{ item.name }} {{ item.lastName }}</a>
                          </td>
                          <td>
                            <!-- Text -->
                            <span class="item-title">{{ item.role }}</span>
                          </td>
                          <td>
                            <!-- Email -->
                            <a class="item-email text-reset">{{ item.email }}</a>
                          </td>
                          <td>
                            <!-- Badge -->
                            <span v-if="!item.state" class="item-score badge bg-danger-soft">Desactivado</span>
                            <span v-if="item.state" class="item-score badge bg-success-soft">Activado</span>
                          </td>
                          <td class="text-end">

                            <!-- Dropdown -->
                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#"
                                    role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <router-link :to="{name:'edit', params:{id:item._id}}" class="dropdown-item">Editar</router-link>
                                    <a style="cursor: :pointer" class="dropdown-item"
                                      v-b-modal="'delete-'+item._id">
                                      <span v-if="item.state">Desactivar</span>
                                      <span v-if="!item.state">Activar</span>
                                    </a>
                                </div>
                            </div>
                            <b-modal :id="'delete-'+item._id" title="BootstrapVue"
                              title-html="<h4 class='card-header-title'><b>Agregrar Miembros</b></h4>"
                              @ok="updateState(item._id, item.state)">
                                  <p class="my-4">{{ item._id }}</p>
                            </b-modal>
                              
                          </td>
                        </tr>
                        </paginate>
                        <tr v-if="load_date">
                            <td colspan="5" class="text-center">
                                                    <div class="spinner-border mt-5 mb-5 text-info" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </td>
                        </tr>
                    </table>
                  </div>
                  <div class="card-footer d-flex justify-content-between">

                    <!-- Pagination (prev) -->
                    <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-0 pe-4 border-end" href="#" v-on:click="goPrev()">
                          <i class="fe fe-arrow-left me-1"></i> Prev
                        </a>
                      </li>
                    </ul>

                    <!-- Pagination -->
                    <paginate-links @change="onLangsPageChange" for="users" :classes="{
                                            'ul': ['list-pagination', 'pagination', 'pagination-tabs', 'card-pagination']
                                            , 'a': ['page']
                                        }"></paginate-links>

                    <!-- Pagination (next) -->
                    <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-4 pe-0 border-start" href="#" v-on:click="goNext()">
                          Next <i class="fe fe-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>

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
import axios from 'axios';

export default {
    name: 'IndexCollaboratorPage',
    data(){
        return {
            users: [],
            users_const: [],
            paginate: ['users'],
            currentPage: 1,
            perPage: 2,
            filter: '',
            load_date: false
        }
    },
    methods: {
      onLangsPageChange(toPage, fromPage) {
            this.currentPage = toPage;
        },
      goPrev() {
            if (this.currentPage >= 2) {
                this.$refs.users.goToPage(this.currentPage--);
            } else {
                this.$refs.users.goToPage(1);
            }
        },
      goNext() {
          if (this.currentPage <= Math.ceil(this.users.length / this.perPage)) {
              this.$refs.users.goToPage(this.currentPage++);
          } else {
              this.$refs.users.goToPage(Math.ceil(this.users.length / this.perPage));
          }
      },
      //Fitrar usuario por busqueda
      filtrar(){
              let terms = new RegExp(this.filter, 'i');
              //this.users = this.users_const.filter(item => terms.test(item.nombres) || terms.test(item.apellidos) || terms.test(item.email));
              this.init_data();+
              
              console.log(this.filter);
          },
      init_data(){
              this.load_date = true;
          axios.get(this.$url+'/list_users/'+this.filter, {
          headers: {
              'Content-Type': "application/json",
              'Authorization': this.$store.state.token
          }
          }).then( (result) => {
              this.users = result.data
              this.users_const = this.users;
              this.load_date = false;
              console.log(this.users);
          }).catch( (err) => {
              console.log(err);
          })
          },
        updateState(id, state){
        axios.put(this.$url+'/change_status_to_user/'+id, {state: state}, {
          headers: {
            'Content-Type': "application/json",
            'Authorization': this.$store.state.token
          }
        }).then( (result)=>{
          this.init_data();
          this.$notify({
                    group: 'foo',
                    title: 'SUCCESSS',
                    text: 'Se actualizo el estado de usuerio',
                    type: 'success'
                });
          console.log("para cambiar estaod", result);
        }).catch( (err)=> {
          console.log(err);
        })
      }
    },
    components: {
        SidebarPage,
        TopNavPage
    },
    beforeMount(){
      this.init_data();
    }
}
</script>
  