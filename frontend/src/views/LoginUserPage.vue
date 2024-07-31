<template>
    <div>
        <!-- Hero Section-->
        <section class="hero" style="margin-top: 10rem">
            <div class="container">
                <!-- Hero Content-->
                <div class="hero-content pb-5 text-center">
                    <h1 class="hero-heading mb-0">ZONA DE CLIENTES</h1>
                </div>
            </div>
        </section>
        <!-- customer login-->
        <section>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="block">
                            <div class="block-header">
                                <h6 class="text-uppercase mb-0">Iniciar Sesion</h6>
                            </div>
                            <div class="block-body">
                                <p class="text-muted">Si ya tiene una cuenta inicie sesion</p>
                                <hr>
                                <form action="customer-orders.html" method="get">
                                    <div class="mb-4">
                                        <label class="form-label" for="email1">Correo electronico</label>
                                        <input class="form-control" id="email1" type="text" placeholder="correo electronico" autocomplete="off" v-model="email">
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" for="password1">Contraseña</label>
                                        <input class="form-control" id="password1" type="password" placeholder="contraseña" autocomplete="off" v-model="password">
                                    </div>
                                    <div class="mb-4" v-if="msm_error_login">
                                        <small class="text-danger">{{ msm_error_login }}</small>
                                    </div>
                                    <div class="mb-4 text-center">
                                        <button class="btn btn-outline-dark" type="button" v-on:click="loginUser()"><i
                                                class="fa fa-sign-in-alt me-2"></i>Iniciar Sesion</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Registro -->
                    <div class="col-lg-5">
                        <div class="block">
                            <div class="block-header">
                                <h6 class="text-uppercase mb-0">Nueva cuenta</h6>
                            </div>
                            <div class="block-body">
                                <p class="text-muted">Aun no se ha regsitrado, resgistrese</p>
                                <hr>
                                <form action="customer-orders.html" method="get">
                                    <div class="mb-4">
                                        <label class="form-label" for="name">Nombre completo</label>
                                        <input class="form-control" id="name" type="text" placeholder="nombre completo" autocomplete="off" v-model="customer.name">
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" for="email">Correo electronico</label>
                                        <input class="form-control" id="email" type="text" placeholder="correo electronico" autocomplete="off" v-model="customer.email">
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" for="password">Contraseña</label>
                                        <input class="form-control" id="password" type="password" placeholder="contraseña" autocomplete="off" v-model="customer.password">
                                    </div>
                                    <div class="mb-4" v-if="msm_error">
                                        <small class="text-danger">{{ msm_error }}</small>
                                    </div>
                                    
                                    <div class="mb-4 text-center">
                                        <button class="btn btn-outline-dark" type="button" v-on:click="registerUserEcomerce()"><i
                                                class="far fa-user me-2"></i>Registrarse </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginUserPage',
    data() {
        return {
            customer: {},
            msm_error : '',
            email: '',
            password: '',
            msm_error_login : ''
        }
    },

    beforeMount(){
        if(this.$store.state.token){
            this.$touter.push({name: 'home'});
        }
    },

    methods:{
        // Registro de usuario y validacion
        registerUserEcomerce(){
            if(!this.customer.name){
                this.msm_error = 'Ingrese los nombres por favor!'
            }else if(!this.customer.email){
                this.msm_error = 'Ingrese el correo por favor!'
            }else if(!this.customer.password){
                this.msm_error = 'Ingrese la contraseña por favor!'
            }else{
                this.msm_error = '';
                axios.post(this.$url+'/register_user_ecomerce', this.customer, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( (result) => {
                    if(result.data.message){
                        this.msm_error = result.data.message;
                    }else{
                        this.msm_error = '';
                        console.log(result);
                    }
                });
            console.log(this.customer);
            }
        },

        loginUser(){
            if(!this.email){
                this.msm_error_login = 'Ingrese un correo electronico';
            }else if(!this.password){
                this.msm_error_login = 'Ingrese un password';
            }else{
                this.msm_error_login = '';
                let data = {
                email: this.email,
                password: this.password
            }
            axios.post(this.$url+'/login_users_ecomerce', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( (result) => {

                if(result.data.message){
                    this.msm_error_login = result.data.message;
                }else{
                    this.$store.dispatch('saveToken', result.data.token);
                    this.$store.dispatch('saveUser', JSON.stringify(result.data.userLog));
                    console.log(result)
                    this.$router.push({ name: 'home' });
                    this.$socket.emit('send_car', true)
                }
            }).catch( (err)=> {
                console.log(err);
            })
            }
        }
    }

}
</script>