<template>
    <header class="header header-absolute">
        <!-- Top Bar-->
        <div class="top-bar">
            <div class="container-fluid">
                <div class="row d-flex align-items-center">
                    <div class="col-sm-7 d-none d-sm-block">
                        <ul class="list-inline topbar-text mb-0">
                            <li class="list-inline-item pe-3 me-0">
                                <img src="/assets/icons/telephone-bl.png" style="width: 16px;">
                                +51 987654321
                            </li>
                            <li class="list-inline-item px-3 border-start d-none d-lg-inline-block">Envios gratis desde 300 soles</li>
                        </ul>
                    </div>
                    <div class="col-sm-5 d-flex justify-content-end">
                        <!-- Language Dropdown-->
                        <div class="dropdown border-end px-3">
                            <a class="dropdown-toggle topbar-link" id="langsDropdown" href="#" data-bs-toggle="dropdown" data-bs-display="static" aria-haspopup="true" aria-expanded="false">
                                <img class="topbar-flag" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/flag/gb.svg" alt="english">English
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated" aria-labelledby="langsDropdown">
                                <a class="dropdown-item text-sm" href="#">
                                    <img class="topbar-flag" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/flag/de.svg" alt="german">German
                                </a>
                                <a class="dropdown-item text-sm" href="#">
                                    <img class="topbar-flag" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/flag/fr.svg" alt="french">French
                                </a>
                            </div>
                        </div>
                        <!-- Currency Dropdown-->
                        <div class="dropdown ps-3 ms-0">
                            <a class="dropdown-toggle topbar-link" id="currencyDropdown" href="#" data-bs-toggle="dropdown" data-bs-display="static" aria-haspopup="true" aria-expanded="false">USD</a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated" aria-labelledby="currencyDropdown">
                                <a class="dropdown-item text-sm" href="#">EUR</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Top Bar End-->
        <!-- Navbar-->
        <nav class="navbar navbar-expand-lg navbar-sticky navbar-airy navbar-dark bg-fixed-white navbar-fixed-light">
            <div class="container-fluid">
                <!-- Navbar Header  -->
                <a class="navbar-brand" href="index.html">
                    <svg class="navbar-brand-svg" viewBox="0 0 65 16" width="85" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- SVG content here -->
                    </svg>
                </a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                <!-- Navbar Collapse -->
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Inicio</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'shop' }">Tienda</router-link>
                        </li>
                        <!-- Megamenu-->
                        <li class="nav-item dropdown position-static">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Categorias</a>
                            <div class="dropdown-menu dropdown-menu-animated megamenu py-lg-0">
                                <!-- Megamenu content here -->
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Contacto</a>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0">
                        <!-- Search Button-->
                        <div class="nav-item navbar-icon-link" data-bs-toggle="search">
                            <img src="/assets/icons/search.png" style="width: 25px;" />
                        </div>
                        <!-- User Not Logged - link to login page-->
                        <div class="nav-item">
                            <router-link v-if="!$store.state.token" to="/login" class="navbar-icon-link">
                                <img src="/assets/icons/user.png" style="width: 25px;" />
                                <span class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">Log in</span>
                            </router-link>
                            <a v-if="$store.state.token" class="navbar-icon-link dropdown">
                                <img src="/assets/icons/user.png" style="width: 25px;" />
                                <span class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline dropdown-toggle" data-bs-target="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    &nbsp; {{ user.name.split(' ')[0] }}
                                </span>
                                <div class="dropdown-menu dropdown-menu-animated" aria-labelledby="categoryDropdownMenuLink" style="left:-50px !important;">
                                    <a class="dropdown-item" href="category.html">Category - left sidebar</a>
                                    <router-link class="dropdown-item" to="/cuenta/direcciones">Direcciones</router-link>
                                    <a class="dropdown-item" @click="logout">Cerrar sesión</a>
                                </div>
                            </a>
                        </div>
                        <!-- Cart Dropdown-->
                        <div class="nav-item dropdown">
                            <!-- Cart dropdown content here -->
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Fullscreen search area-->
        <div class="search-area-wrapper">
            <!-- Search area content here -->
        </div>
    </header>
</template>

<script>
import axios from 'axios';
import currency_formatter from 'currency-formatter';

export default {
    name: 'HeaderPage',
    data() {
        return {
            user: JSON.parse(this.$store.state.user),
            shopping_car: [],
            total: 0,
            car_length: 0
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            if (this.$route.path !== '/') {
                this.$router.push({ name: 'home' });
            }
            this.shopping_car = [];
            this.car_length = 0;
        },
        loadShoppingCartData() {
            if (this.$store.state.token) {
                axios.get(this.$url + '/get_product_car', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.$store.state.token
                    }
                }).then((result) => {
                    this.shopping_car = result.data.shopping;
                    this.car_length = result.data.shopping_all.length;
                    this.total = result.data.shopping_all.reduce((acc, item) => {
                        return acc + (item.product.price * item.amount);
                    }, 0);
                }).catch((error) => {
                    console.error('Error loading shopping cart data:', error);
                });
            }
        },
        convertCurrency(number) {
            return currency_formatter.format(number, { code: 'USD' });
        }
    },
    created() {
        this.sockets.subscribe('listen_', (data) => {
            console.log(data);
            this.loadShoppingCartData();
            this.user = JSON.parse(this.$store.state.user);
        });
    },
    beforeMount() {
        this.loadShoppingCartData();
    }
}
</script>

<style scoped>
.navbar-fixed-light.fixed-top .navbar-nav .nav-link {
    color: rgb(78 23 99 / 65%) !important;
}
</style>