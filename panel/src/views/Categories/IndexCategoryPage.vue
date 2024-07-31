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
                                        <h6 class="header-pretitle">Categorias</h6>
                                        <!-- Title -->
                                        <h1 class="header-title">Categorias</h1>
                                    </div>
                                </div> <!-- / .row -->

                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12">
                                <button v-if="!section_form" class="btn btn-dark btn-5m" v-on:click="section_form = true">Nueva categoria</button>
                                <button v-if="section_form" class="btn btn-dark btn-5m" v-on:click="section_form = false">Agregar</button>
                            </div>
                            <div class="col-12 mt-3" v-if="section_form">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="nueva categoria" v-model="new_category">
                                    <button class="btn btn-dark" v-on:click="create_category()">Nueva categoria</button>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <ul class="list-group list-group-flush list my-n3">
                                    <li class="list-group-item" v-for="item in categories">
                                        <div class="row align-items-center">
                                            <div class="col-auto">

                                                <!-- Avatar -->
                                                <a href="profile-posts.html" class="avatar">
                                                    <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-5.jpg"
                                                        alt="..." class="avatar-img rounded-circle">
                                                </a>

                                            </div>
                                            <div class="col ms-n2">

                                                <!-- Title -->
                                                <h4 class="mb-1 name">
                                                    <a href="profile-posts.html">{{ item.category.title }} ({{ item.nproducts }}) productos</a>
                                                </h4>

                                                <!-- Time -->
                                                <p class="small mb-0" v-if="item.category.state">
                                                    <span class="text-success">●</span> Publicado
                                                </p>
                                                <p class="small mb-0" v-if="!item.category.state">
                                                    <span class="text-danger">●</span> Oculto
                                                </p>

                                            </div>
                                            <div class="col-auto">

                                                <!-- Button -->
                                                <a v-b-modal="'state-'+item.category._id" v-if="item.category.state" class="btn btn-sm btn-danger text-white"
                                                    style="margin-right: 1rem;">
                                                    Ocultar
                                                </a>
                                                <a v-b-modal="'state-'+item.category._id" v-if="!item.category.state" class="btn btn-sm btn-primary text-white"
                                                    style="margin-right: 1rem;">
                                                    Mostrar
                                                </a>
                                                <button v-on:click="openInputGroup(item.category._id)" class="btn btn-sm btn-dark text-white">
                                                    Subcategoria
                                                </button>

                                                <b-modal :id="'state-'+item.category._id" title="BootstrapVue"
                                                    title-html="<h4 class='card-header-title'><b>Agregrar Miembros</b></h4>"
                                                    @ok="updateState(item.category._id, item.category.state)">
                                                        <p class="my-4">{{ item.category._id }}</p>
                                                </b-modal>

                                            </div>
                                        </div>

                                        <div class="input-group mt-4 hide_input content_group" :id="'content_'+item.category._id">
                                            <input type="text" class="form-control" placeholder="nueva categoria" v-model="new_subcategory">
                                            <button class="btn btn-dark" v-on:click="create_subcategory()">Nueva subcategoria</button>
                                        </div>
                                        <!-- / .row -->
                                        <div class="row mb-3">
                                            <div class="col-12">
                                                <ul class="list-group mt-3">

                                                    <li v-for="subItem in item.subcategory" class="list-group-item d-flex justify-content-between align-items-center"
                                                        style="font-size: .8rem;padding: 0.5rem 1.5rem;">
                                                        {{ subItem.title }}
                                                        <a style="cursor: pointer" v-b-modal="'delete-'+subItem._id" class="btn btn-sm btn-danger text-white">
                                                            Quitar
                                                        </a>
                                                        <b-modal centered :id="'delete-'+subItem._id" title="BootstrapVue"
                                                            title-html="<h4 class='card-header-title'><b>Agregrar Miembros</b></h4>"
                                                             @ok="delete_subcategory(subItem._id)">
                                                            <p class="my-4">{{ subItem._id }}</p>
                                                        </b-modal>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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
import $ from 'jquery';

export default {
    name: 'IndexCategoryPage',
    data(){
        return {
            section_form : false,
            new_category: '',
            id_category: '',
            new_subcategory: '',
            categories: [],
            subcategories: [],

        }
    },

    methods: {
        create_category(){
            if(this.new_category){
                console.log(this.new_category);
            axios.post(this.$url+'/create_category',{title : this.new_category}, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : this.$store.state.token
              }
            }).then( (result) => {
                if(result.data.message){
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: result.data.message,
                        type: 'error'
                    });
                }else{
                this.new_category = '';
                this.$notify({
                        group: 'foo',
                        title: 'SUCCESS',
                        text: 'Se registro la categoria',
                        type: 'success'
                    });
                }
            })
            }else{
                this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: "Ingrese el titulo de la categoria",
                        type: 'error'
                    });
            }
        },

        init_data(){
            axios.get(this.$url+'/list_category', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : this.$store.state.token
              }
            }).then( (result) => {
                this.categories = result.data;
                console.log(result);
            })
        },

        openInputGroup(id){
            console.log(id)
            setTimeout( () =>{
                this.new_category = '';
                this.id_category = id;
                $('.content_group').addClass('hide_input');
                $('#content_'+id).removeClass('hide_input');
            }, 50);
        },
        
        create_subcategory(){
           if(this.new_subcategory){
            axios.post(this.$url+'/create_subcategory',
            {
                title : this.new_subcategory,
                category: this.id_category
            }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : this.$store.state.token
              }
            }).then( (result) => {
                if(result.data.message){
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: result.data.message,
                        type: 'error'
                    });
                }else{
                this.new_subcategory = '';
                this.$notify({
                        group: 'foo',
                        title: 'SUCCESS',
                        text: 'Se registro la subcategoria',
                        type: 'success'
                    });
                    this.init_data();
                }
            })
           }else{
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese el titulo de la categoria',
                type: 'error'
            });
           }
        },

        delete_subcategory(id){
            axios.delete(this.$url+'/delete_subcategory/'+id, {
          headers: {
            'Content-Type': "application/json",
            'Authorization': this.$store.state.token
          }
        }).then( (result)=>{
          this.init_data();
          this.$notify({
                    group: 'foo',
                    title: 'SUCCESSS',
                    text: 'Se elimino la subcategoria',
                    type: 'success'
                });
        }).catch( (err)=> {
          console.log(err);
        })
        },

        updateState(id, state){
        axios.put(this.$url+'/change_status_to_product/'+id, {state: state}, {
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

    beforeMount(){
        this.init_data();
    },

    components: {
        SidebarPage,
        TopNavPage
    },
}
</script>

<style>
.hide_input{
    display: none;
}

.show_input{
 display: block;
}
</style>
