<template>
    <div style="background: rgb(250 236 255)" class="pb-5">
        <!-- Hero Section-->
        <section class="hero" style="margin-top: 8rem !important">
            <div class="container">
                <!-- Breadcrumbs -->
                <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                    <li class="breadcrumb-item active">Carrito</li>
                </ol>
                <!-- Hero Content-->
                <div class="hero-content pb-5 text-center">
                    <h1 class="hero-heading">Carrito de campras</h1>
                    <div class="row">
                        <div class="col-xl-8 offset-xl-2">
                            <p class="lead text-muted">Bienvenido 😁</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shopping Cart Section-->
        <section>
            <div class="container">
                <div class="row mb-5">
                    <div class="col-lg-8">
                        <div class="cart">
                            <div class="cart-wrapper">
                                <div class="cart-header text-center" style="background-color: aquamarine !important">
                                    <div class="row">
                                        <div class="col-5 text-white">Producto</div>
                                        <div class="col-2 text-white">Precio</div>
                                        <div class="col-2 text-white">Cantidad</div>
                                        <div class="col-2 text-white">Subtotal</div>
                                        <div class="col-1"></div>
                                    </div>
                                </div>
                                <div class="cart-body" style="background-color: white !important"  v-if="!load_data">
                                    <!-- Product-->
                                    <div class="cart-item" v-for="item in product">
                                        <div class="row d-flex align-items-center text-center">
                                            <div class="col-5">
                                                <div class="d-flex align-items-center">
                                                    <router-link :to="{ name: 'product-shop', params: { slug: item.product.slug } }"><img
                                                            class="cart-item-img"
                                                            :src="$url + '/get_frontPage_product/' + item.product.frontPage"
                                                            alt="...">
                                                    </router-link>
                                                    <div class="cart-title text-start">
                                                        <router-link class="text-uppercase text-dark"
                                                        :to="{ name: 'product-shop', params: { slug: item.product.slug } }">
                                                        <strong>{{ item.product.title.substring(0, 20) }}...</strong>
                                                        </router-link>
                                                        <br>
                                                        <span class="text-muted text-sm">{{ item.product.variety }}: {{ item.variety.variety }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-2">{{convertCurrency(item.product.price) }}</div>
                                            <div class="col-2">
                                                {{ item.amount }}
                                            </div>
                                            <div class="col-2 text-center">{{convertCurrency(item.product.price * item.amount) }}</div>
                                            <div class="col-1 text-center">
                                                <a class="cart-remove" style="cursor: pointer" v-on:click="delete_product_car(item._id)">
                                                    <img src="/assets/media/borrar.png" style="width: 30px">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" style="background-color: white !important" v-if="load_data">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <img src="/assets/media/borrar.png" style="width:20px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="my-5 d-flex justify-content-between flex-column flex-lg-row">
                            <router-link class="btn btn-link text-muted" to="/shop">Continuar comprando
                            </router-link>
                            <router-link to="/checkout"  class="btn btn-dark">Proceed to checkout
                                <i class="fa fa-chevron-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="block mb-5">
                            <div class="block-header">
                                <h6 class="text-uppercase mb-0">Detalle de orden</h6>
                            </div>
                            <div class="block-body bg-light pt-1">
                                <p class="text-sm">😁</p>
                                <ul class="order-summary mb-0 list-unstyled">
                                <li class="order-summary-item"><span>Subtotal </span><span>{{ convertCurrency(total) }}</span></li>
                                <li class="order-summary-item"><span>Envio</span><span>{{ convertCurrency($envio) }}</span></li>
                                <li class="order-summary-item border-0"><span>Total</span><strong
                                        class="order-summary-total">{{ convertCurrency(total + $envio) }}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div></template>

<script>
import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
    name: 'ShoppingCartPage',
    data(){
        return {
            total: 0,
            product: [],
            load_data: true,
        }
    },

    methods: {
        init_data() {
            this.load_data = true;
            if (this.$store.state.token != null) {
                axios.get(this.$url+'/get_product_car',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : this.$store.state.token
                    }
                }).then((result) => {
                    // Total al carrito
                    this.total = 0;
                    for (let item of result.data.shopping_all) {
                        const subtotal = item.product.price * item.amount;
                        this.total = this.total + subtotal;
                    }
                    this.product = result.data.shopping_all
                    console.log(this.product);
                    this.load_data = false;
                })
            }
        },

        convertCurrency(number) {
            return currency_formatter.format(number, { code: 'USD' });
        },

        delete_product_car(id){
            axios.get(this.$url + '/delete_product_car/'+id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.$store.state.token
                    }
                }).then((result) => {
                    console.log(result);
                    this.init_data();
                    this.$socket.emit('send_car', true)
                })
        }
    },

    beforeMount() {
        this.init_data();
        console.log("token", this.$store.state.token)
    }
}
</script>