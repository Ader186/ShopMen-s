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
                                        <h1 class="header-title">Galeria de productos</h1>
                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link to="/product" class="nav-link">Todos los
                                                    productos</router-link>
                                            </li>
                                            <li class="nav-item">
                                            <li class="nav-item">
                                                <a class="nav-link active">Galeria de producto</a>
                                            </li>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <template v-if="load_data">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <div class="spinner-border text-info" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="!load_data">
                            <div>
                                <div class="mb-7" v-if="data">
                            <div class="row">
                                <div class="col-12 col-md-12">
                                    <!-- Email address -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="mb-1">Imagen</label>
                                        <!-- Input -->
                                        <div class="input-group mb-3">
                                            <input type="file" id="input_file" class="form-control" placeholder="Selecciona la imagen" v-on:change=" uploadImage($event)">
                                            <button class="btn btn-primary" v-on:click="register_imagen()">
                                                <i class="fe fe-upload"></i>
                                            </button>
                                        </div>
                                        <!-- Form text -->
                                        <small class="form-text text-muted">
                                            Subo un maximo de 5 imagenes para la galeria del producto.
                                        </small>
                                    </div>

                                </div>

                            </div> <!-- / .row -->

                            <div class="row listAlias" v-if="!load_gallery">
                                <div class="col-12 col-md-6 col-xl-4" v-for="item in gallery">
                                    <div class="card">
                                        <a href="project-overview.html">
                                            <img :src="$url+'/get_gallery_product/'+item.imagen"
                                                alt="..." class="card-img-top">
                                        </a>
                                        <div class="card-footer card-footer-boxed">
                                            <div class="row">
                                                <div class="col text-center">
                                                    <a v-b-modal="'delete-'+item._id" style="cursor: pointer" class="text-danger">Eliminar imagen</a>
                                                    <b-modal :id="'delete-'+item._id" title="BootstrapVue"
                                                        title-html="<h4 class='card-header-title'><b>Eliminar imagen</b></h4>"
                                                        @ok="delete_image(item._id)">
                                                            <p class="my-4">{{ item._id }}</p>
                                                    </b-modal>
                                                </div>

                                            </div> <!-- / .row -->
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row mt-5" v-if="load_gallery">
                                <div class="col-12 text-center">
                                    <img src="/assets/img/reloj.gif" alt="" style="width: 100px;">
                                </div>
                            </div>

                        </div>

                        <template v-if="!data">
                                <div>
                                    <ErrorPage></ErrorPage>
                                </div>
                        </template>
                            </div>
                        </template>

                    </div>
                </div> <!-- / .row -->
            </div>
        </div>
    </div>
</template>

<script>
import SidebarPage from '../../components/SidebarPage.vue';
import TopNavPage from '../../components/TopNavPage.vue';
import ErrorPage from '../../components/ErrorPage.vue';
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'GalleryProductsPage',
    data() {
        return {
            imagen: undefined,
            str_image: '',
            data: false,
            load_data : true,
            load_gallery: true,
            gallery: [],
        }
    },

    beforeMount(){
        $('body').attr('style', 'background: black');
    },
    methods: {
        init_data() {
            this.load_data = true;
            axios.get(this.$url + '/get_product_id/' + this.$route.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                console.log(result);

                if(result.data == ''){
                    this.data = false;
                }else{
                    this.data = true;
                    this.product = result.data;
                    this.str_image = this.$url + '/get_frontPage_product/' + this.product.frontPage;
                }
                this.load_data = false;
               })
        },

        uploadImage($event){
            var image;
            if($event.target.files.length >= 1){
                image = $event.target.files[0]
            }
            if(image.size <= 10000000){
                if(image.type == 'image/jpeg'||image.type == 'image/png'||image.type == 'image/webp'||image.type == 'image/jpg'){
                    this.str_image = URL.createObjectURL(image);
                    this.imagen = image;
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'El recurso debe ser image',
                        type: 'error'
                    });
                    this.imagen = undefined
                    $('#input_file').val('');
                }
               
            }else{
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'La imagen debe pesar menos de 1M',
                    type: 'error'
                });
                this.imagen = undefined;
                $('#input_file').val('');
            }
            console.log(image);
        },

        register_imagen(){
           if(this.imagen == undefined){
            this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Debes seleccionar una imagen para subir',
                    type: 'error'
                });
           }else{
                var fm = new FormData();
                fm.append('product',this.$route.params.id);
                fm.append('imagen',this.imagen);

                axios.post(this.$url+'/register_imagen',fm,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : this.$store.state.token
                    }
                }).then((result)=>{
                    if (result.data.message) {
                            this.$notify({
                                group: 'foo',
                                title: 'ERROR',
                                text: result.data.message,
                                type: 'error'
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                title: 'SUCCESS',
                                text: 'La imagen se subio correctamente',
                                type: 'success'
                        });
                        this.init_gallery();
                    }
                });
           }
        },

        init_gallery() {
            this.load_gallery = true;
            axios.get(this.$url + '/list_image_gallery/' + this.$route.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                this.gallery = result.data;
                console.log(this.gallery);
                this.load_gallery = false;
            });
        },
        delete_image(id){
            axios.delete(this.$url + '/delete_image_gallery/'+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                if(result.data.message){
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: result.data.message,
                        type: 'error'
                    });
                }else{
                    this.$notify({
                    group: 'foo',
                    title: 'SUCCESS',
                    text: 'Se elimino correctamente',
                    type: 'success'
                });
                }
                this.init_gallery();
                console.log(result);
            });
        }
    },
    beforeMount(){
        this.init_data();
        this. init_gallery();
    },

    components: {
        SidebarPage,
        TopNavPage,
        ErrorPage
    },
}
</script>
