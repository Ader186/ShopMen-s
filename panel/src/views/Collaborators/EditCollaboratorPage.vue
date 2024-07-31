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
                                        <h6 class="header-pretitle">
                                            useres
                                        </h6>

                                        <!-- Title -->
                                        <h1 class="header-title">
                                            Editar user
                                        </h1>

                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link to="/collaborator" class="nav-link">Todos los
                                                    colaboradores</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/register_admin" class="nav-link active">Nuevo
                                                    colaborador</router-link>
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Form -->
                            <template v-if="data">
                                <div>
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <!-- First name -->
                                            <div class="form-group">

                                                <!-- Label -->
                                                <label class="form-label">Nombres</label>

                                                <!-- Input -->
                                                <input type="text" class="form-control" v-model="user.name"
                                                    placeholder="Nombre">

                                            </div>

                                        </div>
                                        <div class="col-12 col-md-6">

                                            <!-- Last name -->
                                            <div class="form-group">

                                                <!-- Label -->
                                                <label class="form-label">Apellidos</label>

                                                <!-- Input -->
                                                <input type="text" class="form-control" v-model="user.lastName" placeholder="Apellido">
                                            </div>

                                        </div>
                                        <div class="col-12">

                                            <!-- Email address -->
                                            <div class="form-group">

                                                <!-- Label -->
                                                <label class="mb-1">
                                                    Correo electrónico
                                                </label>

                                                <!-- Form text -->
                                                <small class="form-text text-muted">
                                                    This contact will be shown to others publicly, so choose it carefully.
                                                </small>

                                                <!-- Input -->
                                                <input type="email" class="form-control" v-model="user.email"
                                                    placeholder="Email">

                                            </div>

                                        </div>

                                        <div class="col-12 col-md-6">

                                            <!-- Birthday -->
                                            <div class="form-group">

                                                <!-- Label -->
                                                <label class="form-label">
                                                    Cargo
                                                </label>

                                                <!-- Input -->
                                                <select name="" class="form-select" id="" v-model="user.role">
                                                    <option value="" disabled selected>Seleccionar</option>
                                                    <option value="Administrador">Administrador</option>
                                                    <option value="Vendedor">Vendedor</option>
                                                    <option value="Inventariado">Inventariado</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                    <hr class="my-5">
                                    <button class="btn btn-primary" type="button" v-on:click="validateUser()">
                                        Guardar user
                                    </button>
                                </div>
                            </template>

                            <template v-if="!data">
                                <div>
                                    <ErrorPage></ErrorPage>
                                </div>
                            </template>
                        

                        <br><br>

                    </div>
                </div> <!-- / .row -->
            </div>

        </div>
    </div>
</template>

<script>
import SidebarPage from '@/components/SidebarPage.vue';
import TopNavPage from '@/components/TopNavPage.vue';
import ErrorPage from '@/components/ErrorPage.vue';
import axios from 'axios';

export default {
    name: 'EditCollaboratorPage',
    data() {
        return {
            user: {
                role: ''
            },
            id: this.$route.params.id,
            data: false
        }
    },
    methods: {
        init_date() {
            axios.get(this.$url+'/get_user_admin/'+this.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                console.log("result", result);
                if (result.data == "") {
                    this.data = false
                } else {
                    this.data = true
                    this.user = result.data;
                }
                console.log(this.data);
            }).catch((err) => {
                console.log('Ocurrio un error', err);
            })
        },

        validateUser() {
            if (!this.user.name) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese los nombres',
                    type: 'error'
                });
            } else if (!this.user.lastName) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese los apellidos',
                    type: 'error'
                });
            } else if (!this.user.email) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el email',
                    type: 'error'
                });
            } else if (!this.user.role) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el rol',
                    type: 'error'
                });
            } else {
                this.updateUser();
            }
            console.log(this.user);
        },

        updateUser(){
            axios.put(this.$url+'/update_user_admin/'+this.id, this.user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then( (result)=>{
                this.$notify({
                    group: 'foo',
                    title: 'SUCCESSS',
                    text: 'Se actualizo el user',
                    type: 'success'
                });
                this.$router.push({name: 'index'})
            }).catch( (err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        console.log(this.id);
    },
    beforeMount() {
        this.init_date();
    },

    components: {
        SidebarPage,
        TopNavPage,
        ErrorPage
    }
}

</script>