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
                                        <h1 class="header-title">Nuevo Producto</h1>
                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link to="/product" class="nav-link">Todos los productos</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link active"> Nuevo Producto</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-7">
                            <div class="row justify-content-between align-items-center">
                                <div class="col">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar">
                                                <img class="avatar-img rounded-circle"
                                                    :src="str_image" alt="...">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">
                                            <!-- Heading -->
                                            <h4 class="mb-1"><b>Portada</b></h4>
                                            <!-- Text -->
                                            <small class="text-muted">PNG or JPG no bigger than 1000px wide and tall.</small>
                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="col-auto">
                                    <!-- Button -->
                                    <label for="file-upload" class="btn btn-sm btn-primary">Upload</label>
                                    <input style="display:none" id="file-upload" type="file" v-on:change="uploadImage($event)"/>
                                </div>
                            </div> <!-- / .row -->

                            <!-- Divider -->
                            <hr class="my-5">

                            <div class="row">
                                <div class="col-12 col-md-12">

                                    <!-- Email address -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="mb-1">Título del producto</label>
                                        <!-- Input -->
                                        <input type="email" class="form-control" placeholder="Título del producto" v-model="product.title">
                                    </div>

                                </div>
                                
                                <div class="col-12 col-md-6">
                                    <!-- First name -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="form-label"> Categoria</label>

                                        <!-- Input -->
                                        <select name="" class="form-select" v-model="product.category" v-on:change="getSubcategory($event)">
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option :value="item.category.title" v-for="item in categories">{{ item.category.title }}</option>
                                        </select>

                                    </div>

                                </div>

                                <div class="col-12 col-md-6">
                                    <!-- First name -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="form-label"> Subcategoria</label>

                                        <!-- Input -->
                                        <select name="" class="form-select" v-model="product.subcategory">
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option :value="item.title" v-for="item in subcategoryes">{{ item.title }}</option>
                                        </select>

                                    </div>

                                </div>

                                <div class="col-12 col-md-6">

                                    <!-- Last name -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="form-label">Variedad</label>
                                        <!-- Input -->
                                        <input type="text" class="form-control" placeholder="Variedad" v-model="product.variety">
                                    </div>

                                </div>

                                <div class="col-12 col-md-6">
                                    <!-- Last name -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="form-label">Precio</label>
                                        <!-- Input -->
                                        <input disabled type="number" class="form-control" placeholder="Precio" value="0">
                                    </div>
                                </div>
                                <div class="col-12 col-md-12">
                                    <!-- Phone -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="form-label">Extracto</label>
                                        <!-- Input -->
                                        <textarea class="form-control" id="" rows="3" placeholder="Extracto" v-model="product.description"></textarea>
                                    </div>
                                </div>
                            </div> <!-- / .row -->

                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <!-- Public profile -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="mb-1">Producto publicado</label>

                                        <!-- Form text -->
                                        <small class="form-text text-muted">Making your profile public means that anyone on the Dashkit network will be ableto find you.</small>

                                        <div class="row">
                                            <div class="col-auto">

                                                <!-- Switch -->
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="switchOne" v-model="product.state"/>
                                                    <label class="form-check-label" for="switchOne"></label>
                                                </div>

                                            </div>
                                            <div class="col ms-n2">
                                                <!-- Help text -->
                                                <small class="text-muted">Borrador activado</small>
                                            </div>
                                        </div> <!-- / .row -->
                                    </div>

                                </div>
                                <div class="col-12 col-md-6">

                                    <!-- Allow for additional Bookings -->
                                    <div class="form-group">
                                        <!-- Label -->
                                        <label class="mb-1">En descuento</label>

                                        <!-- Form text -->
                                        <small class="form-text text-muted">
                                            If you are available for hire outside of the current situation, you can
                                            encourage others to hire you.
                                        </small>

                                        <div class="row">
                                            <div class="col-auto">

                                                <!-- Switch -->
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="switchTwo" v-model="product.discount"/>
                                                    <label class="form-check-label" for="switchTwo"></label>
                                                </div>

                                            </div>
                                            <div class="col ms-n2">
                                                <!-- Help text -->
                                                <small class="text-muted">Descuento desactivado</small>
                                            </div>
                                        </div> <!-- / .row -->
                                    </div>

                                </div>
                            </div> <!-- / .row -->
                            <!-- Divider -->
                            <hr class="mt-4 mb-5">
                            <!-- Button -->
                            <button class="btn btn-primary" v-on:click="validate()">Crear Producto</button>
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
    name: 'CreateProductsPage',
    data(){
        return {
            str_image : '/assets/img/avatar-1.jpg',
            product: {
                category: '',
                state: false,
                discount: false,
                frontPage: undefined,
                subcategory: ''
            },
            categories: [],
            frontPage: undefined,
            subcategoryes: []
        }
    },
    components: {
        SidebarPage,
        TopNavPage
    },

    methods: {
        uploadImage($event){
            var image;
            if($event.target.files.length >= 1){
                image = $event.target.files[0]
            }
            if(image.size <= 10000000){
                if(image.type == 'image/jpeg'||image.type == 'image/png'||image.type == 'image/webp'||image.type == 'image/jpg'){
                    this.str_image = URL.createObjectURL(image);
                    this.frontPage = image;
                    this.product.frontPage = this.frontPage;
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'El recurso debe ser image',
                        type: 'error'
                    });
                    this.frontPage = undefined
                }
               
            }else{
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'La imagen debe pesar menos de 1M',
                    type: 'error'
                });
                this.frontPage = undefined
            }
            console.log(image);
        },

        validate(){
            if(!this.product.title){
                this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese el titulo del producto',
                type: 'error'
            });
        }else if(!this.product.category){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Seleccione una categoria',
                type: 'error'
            });
        }else if(!this.product.subcategory){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Seleccione una subcategoria',
                type: 'error'
            });
        }else if (!this.product.variety) {
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese la variedad del producto',
                type: 'error'
            })
        }else if(!this.product.description){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Se requiere una descripcion del producto',
                type: 'error'
            });
        }else if(this.product.frontPage == undefined){
            this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Seleccione una imagen de portada',
                type: 'error'
            });
        }else{
            this.registro();
            console.log(this.product);
        }
        },

        registro(){
          var fm = new FormData();
          fm.append('title',this.product.title);
          fm.append('category',this.product.category);
          fm.append('subcategory',this.product.subcategory);
          fm.append('variety',this.product.variety);
          fm.append('description',this.product.description);
          fm.append('state',this.product.state);
          fm.append('discount',this.product.discount);
          fm.append('frontPage',this.product.frontPage); //IMAGEN

          axios.post(this.$url+'/register_product',fm,{
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization' : this.$store.state.token
              }
          }).then((result)=>{
            console.log(result);
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
                        text: 'Se creo correctamente.',
                        type: 'success'
                    });
                    this.$router.push({name: 'product-index'});
                }
                
            console.log(result);
        });
      },

        init_category(){
            axios.get(this.$url+'/list_category', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : this.$store.state.token
              }
            }).then( (result) => {
                this.categories = result.data;
                console.log(this.categories);
            })
        },

        getSubcategory($event){
            console.log($event.target.value);

            for(var item of this.categories){
                console.log(item.category);
                if(item.category.title == $event.target.value){
                    this.subcategoryes = item.subcategory;
                }
            }
            // this.subcategoryes = this.categories.filter(item => item.category.title == $event.target.value)[0].subcategoryes;
            console.log(this.subcategoryes);
        }

    },
    beforeMount(){
        this.init_category();
    }
}
</script>
