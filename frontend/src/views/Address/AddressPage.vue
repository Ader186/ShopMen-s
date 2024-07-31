<template>
    <div style="background: rgb(250 236 255)" class="pb-5">
        <!-- Hero Section-->
        <section class="hero" style="margin-top: 8rem !important;">
            <div class="container">
                <!-- Breadcrumbs -->
                <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
                    <li class="breadcrumb-item active">Direcciones</li>
                </ol>
                <!-- Hero Content-->
                <div class="hero-content pb-5 text-center">
                    <h1 class="hero-heading">Direcciones</h1>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="row mb-5">
                    <div class="col-lg-8 col-xl-9">

                        <div class="block">
                            <!-- Invoice Address-->
                            <div class="block-header" style="background-color: #7dcaf6">
                                <h6 class="text-uppercase mb-0 text-white">Nueva direccion</h6>
                            </div>
                            <div class="block-body">
                                <div class="row">
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="fullname_invoice"><b>Nombres</b></label>
                                        <input class="form-control" type="text" placeholder="Joe" v-model="address.name"/>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="emailaddress_invoice"><b>Apellidos</b></label>
                                        <input class="form-control" type="text"
                                            placeholder="black" v-model="address.lastName"/>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="street_invoice"><b>Documento</b></label>
                                        <input class="form-control" type="text"
                                            placeholder="10282000292" v-model="address.idDocument" />
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="city_invoice"><b>Telefono</b></label>
                                        <input class="form-control" type="text" placeholder="(+504) 86967340"
                                        v-model="address.phone"/>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="zip_invoice"><b>Pais</b></label>
                                        <select class="form-control" v-model="address.country">
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option :value="item" v-for="item in $country">{{ item }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="state_invoice"><b>Region/Ciudad</b></label>
                                        <input class="form-control" type="text" placeholder="Fracisco Morazan/Tegucigalpa"
                                        v-model="address.city"/>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="phonenumber_invoice"><b>Codigo Postal</b></label>
                                        <input class="form-control" type="text"
                                            placeholder="Phone Number" v-model="address.code" />
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label class="form-label" for="state_invoice"><b>Direccion</b></label>
                                        <input class="form-control" type="text"  placeholder="Miraflores"
                                        v-model="address.address"/>
                                    </div>
                                </div>
                                <!-- /Invoice Address-->
                            </div>
                            
                        </div>
                        <div class="mb-4 mt-3 text-center mb-5">
                            <button class="btn btn-dark" type="button" v-on:click="create_address()">
                                <i class="far fa-save me-2"></i>Guardar direccion
                            </button>
                        </div>
                        <div class="text-center" v-if="mess_err">
                            <span class="text-danger">{{ mess_err }}</span>
                        </div>

                        <table v-if="addres_data.length >= 1" class="table table-bordered table-striped" style="margin-top: 5rem !important; background-color: white !important;">
                            <thead class="table-green">
                                <tr>
                                    <th scope="col">Receptor</th>
                                    <th scope="col">Localizacion</th>
                                    <th scope="col">Direcciones</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in addres_data">
                                    <th scope="row">
                                        <small>{{ item.name }} {{ item.lastName }}</small><br>
                                        <small>{{ item.phone }}</small>
                                    </th>
                                    <td>
                                        <small>{{ item.country }} {{ item.city }}</small><br>
                                        <small>{{ item.code }}</small>
                                    </td>
                                    <td>{{ item.address }}</td>
                                    <td class="text-center">
                                        <button class="btn btn-danger btn-sm" v-on:click="delete_address(item._id)">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="card" v-if="addres_data.length == 0">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <img src="/assets/media/tailandes.gif" style="width: 40px">
                                        <h3>Aun no tienes direcciones</h3>
                                        <span>Ingresa tu direccion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Customer Sidebar-->
                    <div class="col-xl-3 col-lg-4 mb-5">
                        <SidebarCustomerPage></SidebarCustomerPage>
                    </div>
                    <!-- /Customer Sidebar-->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import SidebarCustomerPage from '@/components/SidebarCustomerPage.vue';

export default {
    name: 'AddressPage',
    data() {
        return {
            address: {
                country: ''
            },
            mess_err: '',
            addres_data: [],

        }
    },

    methods: {
        create_address(){
            if(!this.address.name){
                this.mess_err = 'Ingrese los nombres por favor';
            }else if(!this.address.lastName){
                this.mess_err = 'Ingrese sus apellidos por favor';
            }else if(!this.address.idDocument){
                this.mess_err = 'Ingrese su ID por favor';
            }else if(!this.address.phone){
                this.mess_err = 'Ingrese su numero por favor';
            }else if(!this.address.country){
                this.mess_err = 'Seleccione el pais por favor';
            }else if(!this.address.city){
                this.mess_err = 'Ingres la region o ciudad';
            }else if(!this.address.code){
                this.mess_err = 'Ingrese el codigo postal por favor';
            }else if(!this.address.address){
                this.mess_err = 'Ingrese la direccion por favor';
            }else{
                axios.post(this.$url+'/create_addres_customer', this.address, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : this.$store.state.token
                    }
                }).then( (result) => {
                    console.log(result);
                    this.init_data();
                    this.address = {
                        country: ''
                    }
                })
            }
            
        },
        init_data(){
            axios.get(this.$url+'/get_addres_customer', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : this.$store.state.token
                }
                }).then( (result) => {
                console.log(result);
                this.addres_data = result.data;
            })
        },

        delete_address(id){
            axios.delete(this.$url+'/delete_addres_customer/'+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : this.$store.state.token
                }
                }).then( (result) => {
                console.log(result);
                this.init_data();
            })
        },
    },
    beforeMount(){
        this.init_data();
    },

    components: {
        SidebarCustomerPage,
    }
}
</script>