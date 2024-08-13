<template>
    <footer class="main-footer">
        <!-- Services block-->
        <div class="text-dark-700 py-6">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 service-column">
                        <!-- <svg class="svg-icon service-icon">
                            <use xlink:href="#delivery-time-1"> </use>
                        </svg> -->
                        <img class="svg-icon service-icon" src="/assets/media/camion.gif" alt="">
                        <div class="service-text">
                            <h6 class="text-uppercase">Envios Gratis</h6>
                            <p class="text-muted fw-light text-sm mb-0">Envios gratis desde 300 soles</p>
                        </div>
                    </div>
                    <div class="col-lg-4 service-column">
                        <!-- <svg class="svg-icon service-icon">
                            <use xlink:href="#money-1"> </use>
                        </svg> -->
                        <img class="svg-icon service-icon" src="/assets/media/euro.gif" alt="">
                        <div class="service-text">
                            <h6 class="text-uppercase">Money back guarantee</h6>
                            <p class="text-muted fw-light text-sm mb-0">30 Days Money Back Guarantee</p>
                        </div>
                    </div>
                    <div class="col-lg-4 service-column">
                        <!-- <svg class="svg-icon service-icon">
                            <use xlink:href="#customer-support-1"> </use>
                        </svg> -->
                        <img class="svg-icon service-icon" src="/assets/media/tailandes.gif" alt="">
                        <div class="service-text">
                            <h6 class="text-uppercase">+51 987654321</h6>
                            <p class="text-muted fw-light text-sm mb-0">Soporte 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main block - menus, subscribe form-->
        <div class="py-6 text-muted" style="background: #7dcaf6 !important;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <div class="fw-bold text-uppercase text-lg text-white mb-3">Sell<span style="color: white">.</span>
                        </div>
                        <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                        <ul class="list-inline">
                            <li class="list-inline-item"><a class="text-muted text-primary-hover" href="https://www.instagram.com/" target="_blank"
                                    title="instagram">
                                <img src="/assets/media/instagram.png" style="width: 30px"></a></li>
                            <li class="list-inline-item"><a class="text-muted text-primary-hover" href="https://www.facebook.com/" target="_blank"
                                    title="facebook">
                                <img src="/assets/media/facebook.png" style="width: 30px"></a></li>
                                <li class="list-inline-item"><a class="text-muted text-primary-hover" href="https://twitter.com/" target="_blank"
                                    title="twitter">
                                <img src="/assets/media/twitter.png" style="width: 30px"></a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
                        <h6 class="text-uppercase text-white mb-3">Categorias</h6>
                        <ul class="list-unstyled">
                            <li> <a class="text-white" href="#">For Women</a></li>
                            <li> <a class="text-white" href="#">For Men</a></li>
                            <li> <a class="text-white" href="#">Stores</a></li>
                            <li> <a class="text-white" href="#">Our Blog</a></li>
                            <li> <a class="text-white" href="#">Shop</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
                        <h6 class="text-uppercase text-white mb-3">Soporte</h6>
                        <ul class="list-unstyled">
                            <li> <a class="text-white" href="#">Login </a></li>
                            <li> <a class="text-white" href="#">Register </a></li>
                            <li> <a class="text-white" href="#">Wishlist </a></li>
                            <li> <a class="text-white" href="#">Our Products </a></li>
                            <li> <a class="text-white" href="#">Checkouts </a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4">
                        <h6 class="text-uppercase text-white mb-3">Boletin informativo</h6>
                        <p class="mb-3 text-white"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
                        <form action="#" id="newsletter-form">
                            <div class="input-group mb-3">
                                <input class="form-control bg-transparent border-secondary border-end-0" type="email"
                                    placeholder="Your Email Address" aria-label="Your Email Address" style="    border-color: #ffffff !important; color: white !important">
                                <div class="input-group-append">
                                    <button style="border-color: #ffffff !important" class="btn border-start-0" type="submit">
                                        <img src="/assets/media/lupa.png" alt="" style="width: 18px"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Copyright section of the footer-->
        <div class="py-4 fw-black" style="background-color: #b8bcec !important;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 text-center text-md-start">
                        <p class="mb-md-0">&copy; {{ year }} Mi Tienda. Todos los derechos reservados.</p>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-inline mb-0 mt-2 mt-md-0 text-center text-md-end">
                            <li class="list-inline-item"><img
                                    src="/assets/media/visa.png" alt="..." style="width: 40px;"></li>
                            <li class="list-inline-item"><img
                                    src="/assets/media/master.png" alt="..." style="width: 40px;"></li>
                            <li class="list-inline-item"><img
                                    src="/assets/media/paypal.png" alt="..." style="width: 40px;"></li>
                            <li class="list-inline-item"><img
                                    src="/assets/media/western.png" alt="..." style="width: 40px;">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'FooterPage',
    data() {
        return {
            year: new Date().getFullYear()
        }
    },

    methods: {

    }
}
</script>