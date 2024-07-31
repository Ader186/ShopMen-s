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
                                            Productos
                                        </h6>

                                        <!-- Title -->
                                        <h1 class="header-title">
                                            Editar producto
                                        </h1>

                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link class="nav-link" to="/product">Todos los
                                                    productos</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link active">Editar producto</a>


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
                                                <img class="avatar-img rounded-circle" :src="str_image" alt="...">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Heading -->
                                            <h4 class="mb-1">
                                                <b>Portada</b>
                                            </h4>

                                            <!-- Text -->
                                            <small class="text-muted">
                                                PNG or JPG no bigger than 1000px wide and tall.
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="col-auto">

                                    <!-- Button -->

                                    <label for="file-upload" class="btn btn-sm btn-primary">
                                        Upload
                                    </label>
                                    <input style="display:none" id="file-upload" type="file"
                                        v-on:change="uploadImage($event)" />

                                </div>
                            </div> <!-- / .row -->

                            <!-- Divider -->
                            <hr class="my-5">

                            <div class="row">
                                <div class="col-12 col-md-12">

                                    <!-- Email address -->
                                    <div class="form-group">

                                        <!-- Label -->
                                        <label class="mb-1">
                                            Título del producto
                                        </label>

                                        <!-- Input -->
                                        <input type="text" class="form-control" placeholder="Título del producto"
                                            v-model="product.title">

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
                                        <input type="text" class="form-control" placeholder="Variedad"
                                            v-model="product.variety">
                                    </div>

                                </div>
                                <div class="col-12 col-md-6">

                                    <!-- Last name -->
                                    <div class="form-group">

                                        <!-- Label -->
                                        <label class="form-label">
                                            Precio
                                        </label>

                                        <!-- Input -->
                                        <input readonly type="number" class="form-control" placeholder="Precio"
                                            v-model="product.price">

                                    </div>

                                </div>

                                <div class="col-12 col-md-12">

                                    <!-- Phone -->
                                    <div class="form-group">

                                        <!-- Label -->
                                        <label class="form-label">
                                            Extracto
                                        </label>

                                        <!-- Input -->
                                        <textarea class="form-control" id="" rows="3" placeholder="Extracto"
                                            v-model="product.description"></textarea>

                                    </div>

                                </div>

                            </div> <!-- / .row -->



                            <div class="row">
                                <div class="col-12 col-md-6">

                                    <!-- Public profile -->
                                    <div class="form-group">

                                        <!-- Label -->
                                        <label class="mb-1">
                                            Producto publicado
                                        </label>

                                        <!-- Form text -->
                                        <small class="form-text text-muted">
                                            Making your profile public means that anyone on the Dashkit network will be able
                                            to find you.
                                        </small>

                                        <div class="row">
                                            <div class="col-auto">

                                                <!-- Switch -->
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="switchOne"
                                                        v-model="product.state" />
                                                    <label class="form-check-label" for="switchOne"></label>
                                                </div>

                                            </div>
                                            <div class="col ms-n2">

                                                <!-- Help text -->
                                                <small class="text-muted">
                                                    Borrador activado
                                                </small>

                                            </div>
                                        </div> <!-- / .row -->
                                    </div>

                                </div>
                                <div class="col-12 col-md-6">

                                    <!-- Allow for additional Bookings -->
                                    <div class="form-group">

                                        <!-- Label -->
                                        <label class="mb-1">
                                            En descuento
                                        </label>

                                        <!-- Form text -->
                                        <small class="form-text text-muted">
                                            If you are available for hire outside of the current situation, you can
                                            encourage others to hire you.
                                        </small>

                                        <div class="row">
                                            <div class="col-auto">

                                                <!-- Switch -->
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="switchTwo"
                                                        v-model="product.discount" />
                                                    <label class="form-check-label" for="switchTwo"></label>
                                                </div>

                                            </div>
                                            <div class="col ms-n2">

                                                <!-- Help text -->
                                                <small class="text-muted">
                                                    Descuento desactivado
                                                </small>

                                            </div>
                                        </div> <!-- / .row -->
                                    </div>

                                </div>
                            </div> <!-- / .row -->

                            <!-- Button -->
                            <button class="btn btn-primary mt-5" v-on:click="validate()">
                                Actualizar producto
                            </button>
                            <!-- Divider -->
                            <hr class="mt-4 mb-5">

                            <div class="row justify-content-between align-items-center mb-5">
                                <div class="col-12">

                                    <!-- Heading -->
                                    <h2 class="mb-2">
                                        Variedades de producto
                                    </h2>

                                    <!-- Text -->
                                    <p class="text-muted mb-xl-0">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore aspernatur,
                                        beatae id quod consequuntur.
                                    </p>
                                </div>

                            </div>

                            <div class="row mb-5">
                                <div class="col-lg-5">
                                    <small class="text-muted">
                                        Proveedor
                                    </small>
                                    <input type="text" class="form-control" placeholder="Empresa proveedora"
                                        v-model="variety.supplier">
                                </div>
                                <div class="col-lg-5">
                                    <small class="text-muted">
                                        Variedad
                                    </small>
                                    <input type="text" class="form-control" placeholder="Tallas, colores..."
                                        v-model="variety.variety">
                                </div>
                                <div class="col">
                                    <small class="text-muted">
                                        Acción*
                                    </small> <br>
                                    <button class="btn btn-primary btn-block" style="width: 100% !important;"
                                        v-on:click="validate_variety()">Agregar</button>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body" v-if="varieties.length >= 1">

                                    <!-- List group -->
                                    <div class="list-group list-group-flush my-n3">
                                        <div class="list-group-item" v-for="item in varieties">
                                            <div class="row align-items-center">
                                                <div class="col">

                                                    <!-- Heading -->
                                                    <h4 class="mb-1">
                                                        {{ item.variety.toUpperCase() }}
                                                    </h4>

                                                    <!-- Text -->
                                                    <small class="text-muted">
                                                        <b>SKU: </b>{{ item.sku.toUpperCase() }}
                                                    </small>

                                                </div>
                                                <div class="col">
                                                    <!-- Heading -->
                                                    <h4 class="mb-1">
                                                        {{ item.stock }}
                                                    </h4>

                                                    <!-- Text -->
                                                    <small class="text-muted">
                                                        Unidades
                                                    </small>
                                                </div>
                                                <div class="col-auto">

                                                    <!-- Button -->
                                                    <button v-if="item.stock == 0" class="btn btn-sm btn-danger"
                                                        type="button" v-b-modal="'delete-' + item._id">
                                                        Eliminar
                                                    </button>
                                                    <button v-if="item.stock >= 1" disabled class="btn btn-sm btn-danger"
                                                        type="button">
                                                        Eliminar
                                                    </button>
                                                    <b-modal :id="'delete-' + item._id" title="BootstrapVue"
                                                        title-html="<h4 class='card-header-title'><b>Agregrar Miembros</b></h4>"
                                                        @ok="delete_variety(item._id)">
                                                        <p class="my-4">{{ item._id }}</p>
                                                    </b-modal>

                                                </div>
                                            </div> <!-- / .row -->
                                        </div>
                                    </div>

                                </div>
                                <div class="card-body" v-if="varieties.length == 0">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <img src="/assets/media/image_processing20210514-4075-1evi28b.gif" alt="" style="width:100px">
                                        </div>
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
    name: 'EditProductsPage',
    data() {
        return {
            str_image: '/assets/img/avatar-1.jpg',
            product: {
                category: '',
                state: false,
                discount: false,
                frontPage: undefined,
                subcategory: ''
            },
            frontPage: undefined,
            variety: {},
            sku: '',
            varieties: [],
            categories: [],
            subcategoryes: [],
        }
    },
    components: {
        SidebarPage,
        TopNavPage
    },

    methods: {
        init_data() {
            axios.get(this.$url + '/get_product_id/' + this.$route.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                console.log(result);
                this.product = result.data;
                this.str_image = this.$url + '/get_frontPage_product/' + this.product.frontPage;
            }).catch((err) => {

            })
        },

        uploadImage($event) {
            var image;
            if ($event.target.files.length >= 1) {
                image = $event.target.files[0]
            }
            if (image.size <= 10000000) {
                if (image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/webp' || image.type == 'image/jpg') {
                    this.str_image = URL.createObjectURL(image);
                    this.frontPage = image;
                    this.product.frontPage = this.frontPage;
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'El recurso debe ser image',
                        type: 'error'
                    });
                    this.frontPage = undefined;
                }

            } else {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'La imagen debe pesar menos de 1M',
                    type: 'error'
                });
                this.frontPage = undefined;
            }
            console.log(image);
        },

        validate() {
            if (!this.product.title) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el titulo del producto',
                    type: 'error'
                });
            } else if (!this.product.category) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione una categoria',
                    type: 'error'
                });
            } else if (!this.product.subcategory) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione una subcategoria',
                    type: 'error'
                });
            } else if (!this.product.variety) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese la variedad del producto',
                    type: 'error'
                });
            } else if (!this.product.description) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Se requiere una descripcion del producto',
                    type: 'error'
                });
            } else if (this.product.frontPage == undefined) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione una imagen de portada',
                    type: 'error'
                });
            } else {
                this.updateProduct();
                console.log(this.product);
            }
        },

        updateProduct() {
            var data;
            var content = '';
            if (this.frontPage != undefined) {
                content = 'multipart/form-data';
                data = new FormData();
                fm.append('title', this.product.title);
                fm.append('category', this.product.category);
                fm.append('subcategory',this.product.subcategory);
                fm.append('price', this.product.variety);
                fm.append('description', this.product.description);
                fm.append('state', this.product.state);
                fm.append('discount', this.product.discount);
                fm.append('frontPage', this.product.frontPage); //IMAGEN
            } else {
                data = this.product;
                content = 'application/json'
            }
            axios.put(this.$url + '/update_product/' + this.$route.params.id, data, {
                headers: {
                    'Content-Type': content,
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
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
                        text: 'Se actualizó el producto.',
                        type: 'success'
                    });
                }
            })
        },

        validate_variety() {
            if (!this.variety.supplier) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el proveedor del producto',
                    type: 'error'
                });
            } else if (!this.variety.variety) {
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese la variedad del producto',
                    type: 'error'
                });
            } else {
                this.variety.product = this.$route.params.id;
                this.variety.sku = this.generate_sku();
                console.log(this.variety);
                this.register_variety();
            }

        },
        register_variety() {
            console.log(this.variety);
            axios.post(this.$url + '/register_variety_product', this.variety, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                this.variety = {}
                this.$notify({
                    group: 'foo',
                    title: 'SUCCESS',
                    text: 'Se agrego la nueva variedad',
                    type: 'success'
                });
                this.init_variety();
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        generate_sku() {
            let sku = this.product.title.substr(0, 3) + '' + this.product.variety.substr(0, 3) + '' + this.variety.variety.substr(0, 3) + '' + this.variety.supplier.substr(0, 3);
            return sku.toUpperCase();
        },

        init_variety() {
            axios.get(this.$url + '/get_variety_product/' + this.$route.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
                this.varieties = result.data;
                // this.variety = {}
                // this.$notify({
                //     group: 'foo',
                //     title: 'SUCCESS',
                //     text: 'Se agrego la nueva variedad',
                //     type: 'success'
                // });
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },

        delete_variety(id) {
            axios.delete(this.$url + '/delete_variety_product/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result) => {
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
                        text: 'Se elimino la variedad',
                        type: 'success'
                    });
                    this.init_variety();
                }

            }).catch((err) => {
                console.log(err);
            })
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
                for(var item of this.categories){
                console.log(item.category);
                
                if(item.category.title == this.product.category){
                    this.subcategoryes = item.subcategory;
                }
            }
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
    beforeMount() {
        this.init_data();
        this.init_variety();
        this.init_category();
    }
}
</script>
  