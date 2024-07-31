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
                                        <h1 class="header-title"> Nuevo ingreso</h1>
                                    </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <router-link to="/income" class="nav-link" >Ingresos</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link active">Nuevo ingreso</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6">

                                <!-- Last name -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Proveedor
                                    </label>
                                    <small class="form-text text-muted">
                                        Proveedor encargado del ingreso.
                                    </small>
                                    <!-- Input -->
                                    <select class="form-select mb-3" v-model="income.supplier">
                                        <option value="" selected disabled>Seleccionar</option>
                                        <option>My first option</option>
                                        <option>Another option</option>
                                        <option>Third option is here</option>
                                    </select>

                                </div>

                            </div>

                            <div class="col-12 col-md-6">

                                <!-- Last name -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        N° comprobante
                                    </label>
                                    <small class="form-text text-muted">
                                        Número de la factura.
                                    </small>
                                    <!-- Input -->
                                    <input type="text" class="form-control" placeholder="5DSF-000154" v-model="income.nvoucher">

                                </div>

                            </div>

                            <div class="col-12 col-md-6">

                                <!-- Last name -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Monto total
                                    </label>
                                    <small class="form-text text-muted">
                                        Monto total pagado al proveedor.
                                    </small>
                                    <!-- Input -->
                                    <input type="text" class="form-control" placeholder="546" v-model="income.total_amount">

                                </div>

                            </div>

                            <div class="col-12 col-md-6">

                                <!-- Last name -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Comprobante
                                    </label>
                                    <small class="form-text text-muted">
                                        Subir comprobante del ingreso.
                                    </small>
                                    <!-- Input -->
                                    <input type="file" class="form-control" v-on:change="uploadVaucher($event)">

                                </div>

                            </div>
                        </div>

                        <hr class="my-5">

                        <div class="row">

                            <div class="col-md-12 mb-4">
                                <h3><b>Productos del ingreso</b></h3>
                            </div>

                            <div class="col-12 col-md-6">
                                <!-- First name -->
                                <div class="form-group">
                                    <!-- Label -->
                                    <label class="form-label">Producto</label>
                                    <small class="form-text text-muted">
                                        Seleccion del producto.
                                    </small>
                                    <!-- Input -->
                                    <basic-select :options="products"
                                        v-model="product"
                                        :selected-option="product"
                                        placeholder="seleccione un producto"
                                        @select="product_selected">
                                    </basic-select>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <!-- First name -->
                                <div class="form-group">
                                    <!-- Label -->
                                    <label class="form-label">Variedad</label>
                                    <!-- Input -->
                                    <select class="form-select mb-3" v-model="detail.variety">
                                        <option value="" selected disabled>Seleccionar</option>
                                        <option :value="item._id" v-for="item in varieties">{{ item.variety.toUpperCase() }} - {{ item.sku }} - {{ item.stock }}</option>
                                    </select>
                                   </div>
                            </div>


                            <div class="col-12 col-md-6">

                                <!-- Phone -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Precio unidad
                                    </label>
                                    <!-- Input -->
                                    <input type="text" class="form-control mb-3" placeholder="0.00" v-model="detail.unit_price">

                                </div>

                            </div>
                            <div class="col-12 col-md-6">

                                <!-- Birthday -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Cantidad total
                                    </label>
                                    <!-- Input -->
                                    <input type="number" class="form-control mb-3" placeholder="0" v-model="detail.amount">

                                </div>

                            </div>

                            <div class="col-md-12">

                                <button class="btn btn-primary"
                                style="margin-bottom: 1.8rem!important;" v-on:click="create_detail()">
                                    Agregar
                                </button>
                            </div>
                        </div> <!-- / .row -->

                        <!-- Button -->
                        <div class="card ">
                            <div class="table-responsive mb-0">
                                <table class="table table-sm table-nowrap card-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Precio unidad</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="fs-base" v-if="details.length >= 1">
                                        <tr v-for="(item, index) in details">
                                            <td>
                                                <a href="invoice.html">{{ item.title_produc }}</a>
                                            </td>
                                            <td>
                                                <time datetime="2020-04-24">{{ convertCurrency(item.unit_price) }}</time>
                                            </td>
                                            <td>
                                                {{ item.amount }}
                                            </td>
                                            <td>
                                                {{ convertCurrency( item.unit_price * item.amount) }}
                                                
                                            </td>
                                            <td>
                                                <button class="btn btn-danger btn-sm" v-on:click=" deleteDetail(index, item.unit_price * item.amount)">Quitar</button>
                                            </td>
                                        </tr>

                                    </tbody>
                                    <tbody class="fs-base" v-if="details.length == 0">
                                        <tr >
                                            <td class="text-center" colspan="5">
                                                <span class="text-muted">No hay detalles en el ingreso</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="4">Total</td>
                                            <td>{{ convertCurrency(total) }}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <button class="btn btn-primary mb-7" v-on:click="register_income()">
                            Ingresar datos
                        </button>
                    </div>
                </div> <!-- / .row -->
            </div>
        </div>
    </div>
</template>

<script>
import SidebarPage from '../../components/SidebarPage.vue';
import TopNavPage from '../../components/TopNavPage.vue';
import { BasicSelect } from 'vue-search-select';
import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
    name: 'CreateIncomePage',
    data() {
        return {
            income : {
                supplier : ''
            },
            vaucher: undefined,
            product: {},
            products: [],
            varieties: [],
            detail : {
                variety : ''
            },
            details : [],
            total: 0,
        }
    },

    methods: {
        uploadVaucher($event){
            var image;
            if($event.target.files.length >= 1){
                image = $event.target.files[0]
            }
            if(image.size <= 10000000){
                if(image.type == 'image/jpeg'||image.type == 'image/png'||image.type == 'image/webp'||image.type == 'image/jpg'|| image.type == 'application/pdf'){
                    this.vaucher = image;
                    this.income.document = this.vaucher;
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'El recurso debe ser image',
                        type: 'error'
                    });
                    // comprobante
                    this.vaucher = undefined;
                    //ingreso documento
                    this.income.document = undefined;
                }
               
            }else{
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'La imagen debe pesar menos de 1M',
                    type: 'error'
                });
                this.vaucher = undefined;
                this.income.document = undefined;
            }
            console.log(this.vaucher);
        },

        init_products(){
            this.products = []
            axios.get(this.$url+'/get_all_products', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
            } 
            }).then( (result) => {
                console.log(result);
                for( var item of result.data){
                    this.products.push({
                        value: item._id,
                        text: item.title
                    });
                }
            }).catch( (err) => {
                console.log(err);
            })
        },

        product_selected(item){
            console.log(item);
            this.product = item;
            this.init_variety(item.value);
            this.detail.product = item.value;
            this.detail.title_produc = item.text;
        },

        init_variety(id){
            axios.get(this.$url + '/get_variety_product/'+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then( (result)=> {
                this.varieties = result.data;
                console.log(this.varieties);
            }).catch( (err) => {
                console.log(err);
            })
        },

        create_detail(){
            if(!this.detail.product){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione el producto',
                    type: 'error'
                });
          }else if(!this.detail.variety){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione la variedad',
                    type: 'error'
                });
          }else if(!this.detail.unit_price){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el precio por unidad',
                    type: 'error'
                });
          }else if(!this.detail.amount){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingresar la cantidad a ingresar',
                    type: 'error'
                });
          }else{
                let subTotal =  this.detail.unit_price * this.detail.amount;
                this.total = this.total + subTotal;

                this.details.push(this.detail);
                this.detail = {
                    variety: ''
                }
                this.product = {};
          }
            console.log(this.details);
        },

        convertCurrency(number) {
            return currency_formatter.format(number, { code: 'USD' });
        },

        deleteDetail(idx, subTotal){
            this.details.splice(idx, 1);
            this.total = this.total - subTotal;
        },

        register_income(){
            if(!this.income.supplier){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Seleccione el proveedor',
                    type: 'error'
                });
            }else if(!this.income.nvoucher){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el numero de comprbante',
                    type: 'error'
                });
            }else if(!this.income.total_amount){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese el monto total',
                    type: 'error'
                });
            }else if(!this.income.document){
               this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Suba el comprobante',
                    type: 'error'
                });
            }else{
                console.log(this.income);
                console.log(this.details);

                var fm = new FormData();
                fm.append('supplier',this.income.supplier);
                fm.append('nvoucher',this.income.nvoucher);
                fm.append('total_amount',this.income.total_amount);
                fm.append('resulting_amount',this.total);
                fm.append('revenue',this.$revenue);
                fm.append('document',this.income.document);
                fm.append('details', JSON.stringify(this.details));

                // Registrar los datos de ingreso y detalle de ingreso
                axios.post(this.$url+'/register_income',fm,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : this.$store.state.token
                    }
                }).then((result)=>{
                    if(result.data.message){
                        this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: result.data.message,
                        type: 'error'
                        });
                    }else{
                        console.log(result);
                    }
                })
            }
        }
    },
    beforeMount(){
        this.init_products();
    },

    components: {
        SidebarPage,
        TopNavPage,
        BasicSelect
    },
}
</script>
