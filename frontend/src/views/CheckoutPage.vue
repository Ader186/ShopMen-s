<template>
    <div style="background: rgb(250 236 255)" class="pb-5" >
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
                    <h1 class="hero-heading">Checkout</h1>
                    <div class="row">
                        <div class="col-xl-8 offset-xl-2">
                            <p class="lead text-muted">Por favor revisa tu orden.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Checkout-->
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">

                        <div class="block mb-5">
                            <div class="block-header" style="background-color: #7dcaf6 !important">
                                <h6 class="text-uppercase mb-0 text-white">Dirección de entrega </h6>
                            </div>
                            <div class="block-body" style="background-color:  #f7ece4 !important">
                                <div class="row">
                                    <div class="mb-4 col-md-6 d-flex align-items-center" v-for="item in addres_data">
                                        <input type="radio" name="shippping" id="option0" :value="item._id" v-on:change="selected_address($event)">
                                        <label class="ms-3" for="option0">
                                            <strong class="d-block text-uppercase mb-2">{{ item.country }}, {{ item.city }}</strong>
                                            <span class="text-muted text-sm">{{ item.address }}</span><br>
                                            <span class="text-muted text-sm">{{ item.name }}, {{ item.lastName }}, {{ item.phone }}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="mb-5">
                            <div class="cart">
                                <div class="cart-wrapper">
                                    <div class="cart-header text-center" style="background-color: #7dcaf6 !important">
                                        <div class="row">
                                            <div class="col-6">
                                                <span class="text-left text-white">Producto</span>
                                            </div>
                                            <div class="col-2">
                                                <span class="text-white">Precio</span>
                                            </div>
                                            <div class="col-2">
                                                <span class="text-white">Cantidad</span>
                                            </div>
                                            <div class="col-2">
                                                <span class="text-white">Total</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart-body" style="background-color:  #f7ece4 !important">
                                        <!-- Product-->
                                        <div class="cart-item" v-for="item in product">
                                            <div class="row d-flex align-items-center text-center">
                                                <div class="col-6">
                                                    <div class="d-flex align-items-center">
                                                        <a href="detail.html">
                                                            <img class="cart-item-img"
                                                            :src="$url + '/get_frontPage_product/' + item.product.frontPage" alt="...">
                                                        </a>
                                                        <div class="cart-title text-start">
                                                            <a
                                                                class="text-uppercase text-dark"
                                                                href="detail.html"><strong>{{ item.product.title.substring(0, 20) }}......</strong>
                                                            </a>
                                                            <br>
                                                            <span class="text-muted text-sm">{{ item.product.variety }}: {{ item.variety.variety }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-2">{{convertCurrency(item.product.price) }}</div>
                                                <div class="col-2">{{ item.amount }}
                                                </div>
                                                <div class="col-2 text-center">{{convertCurrency(item.product.price * item.amount) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5 d-flex justify-content-between flex-column flex-lg-row">
                            <router-link to="/shop" class="btn btn-link text-muted" href="checkout3.html">Regresar a tienda</router-link>
                            <a class="btn btn-dark" href="checkout5.html">Place an order</a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="block mb-5">
                            <div class="block-header" style="background-color: #7dcaf6 !important">
                                <h6 class="text-uppercase mb-0">Order Summary</h6>
                            </div>
                            <div class="block-body pt-1" style="background-color: #f7ece4 !important">
                                <p class="text-sm">Shipping and additional costs are calculated based on values you have
                                    entered.</p>
                                <ul class="order-summary mb-0 list-unstyled">
                                    <li class="order-summary-item"><span>Subtotal </span><span>{{ convertCurrency(total) }}</span></li>
                                    <li class="order-summary-item"><span>Envio</span><span>{{ convertCurrency($envio) }}</span></li>

                                    <li class="order-summary-item border-0"><span>Total</span><strong
                                            class="order-summary-total">{{ convertCurrency(total + $envio) }}</strong></li>
                                </ul>
                            </div>
                        </div>

                        <div class="block mb-5">
                            <div class="block-header" style="background-color: #7dcaf6 !important">
                                <h6 class="text-uppercase mb-0">Método de pago</h6>
                            </div>
                            <div class="block-body pt-1 mb-3" style="background-color:  #f7ece4 !important">
                                <div class="col-md-12 mb-2">

                                    <span class="d-block  mb-2" style="letter-spacing: 0px;font-weight: 600;">Tarjeta de
                                        crédito o débito</span>
                                    <div class="row">
                                        <div class="col-12 mb-2">
                                            <img src="/assets/media/payments.png" style="width: 180px">
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted" style="font-size: 13px">
                                                (Luego de hacer clic en "PAGAR" será redirigido a Mercado Pago de forma
                                                segura para completar su compra).</p>
                                        </div>
                                    </div>
                                </div>



                            <div class="col-md-12">
                                <p class="text-sm" style="margin-bottom: 0.4rem;">Deberes e impuestos no están incluidos
                                    en paquetes con envio internacional. /Tus datos personales serán utilizados para
                                    procesar tu pedido y respaldar tu experiencia en este sitio web.</p>
                                <a> <b> Términos & Privacidad.</b></a>
                            </div>

                        </div>
                        <div class="block-footer">
                            <router-link to="/verify/:state" class="btn btn-dark" id="btnBuy" style="cursor: pointer;width: 100%;" v-on:click="paymentMarket()">PAGAR</router-link>
                            <!--  <button class="btn btn-dark btnBuy" style="cursor: pointer" disabled>Procesando...</button> -->

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
import currency_formatter from 'currency-formatter';

export default {
    name: 'CheckoutPage',
    data() {
        return {
            addres_data: [],
            sales: {},
            total: 0,
            product: [],
            load_data: true,
            items: [],

        }
    },

    methods: {
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
        selected_address($event){
            console.log($event.target.value);
            this.sales = $event.target.value;
        },

        init_data_shopping(){
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

                        
                        this.items.push({
                            title: item.product.title,
                            quantity: item.amount,
                            unit_price: item.product.price,
                            currency_id: 'USD'
                        })
                    }
                    this.items.push({
                            title: 'Envio',
                            quantity: 1,
                            unit_price: this.$envio,
                            currency_id: 'USD'
                        })
                    this.product = result.data.shopping_all
                    console.log(this.product);
                    this.load_data = false;
                })
            }
        },

        convertCurrency(number) {
            return currency_formatter.format(number, { code: 'USD' });
        },

        paymentMarket(){
        //     let data = {
        //         back_urls: {
        //             success: 'http://localhost:8080/check/success',
        //             pending: 'http://localhost:8080/check/pending',
        //             failure: 'http://localhost:8080/check/failure'
        //         },
        //         items: this.items,
        //         auto_return: 'approved',
        //     }
        //     axios.post('http://', data, {
        //         headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization' : 'Beares TEST'
        //             }
        //     }).then( (result)=> {
        //         console.log(result);
        //     })
        }
    },
    beforeMount(){
        this.init_data();
        this.init_data_shopping()
    }
}
</script>