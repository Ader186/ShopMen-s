<template>
  <div style="background: rgb(250 236 255)" class="pb-5">
    <section class="product-details" style="margin-top: 8rem !important;">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 pt-4 order-2 order-lg-1">
            <div class="row">
              <div class="d-none d-md-block col-md-2 pe-0">
                <div class="owl-thumbs" data-slider-id="1">
                  <button class="owl-thumb-item detail-thumb-item mb-3" v-if="gallery[0]">
                    <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[0].imagen">
                  </button>
                  <button class="owl-thumb-item detail-thumb-item mb-3" v-if="gallery[1]">
                    <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[1].imagen">
                  </button>
                  <button class="owl-thumb-item detail-thumb-item mb-3" v-if="gallery[2]">
                    <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[2].imagen">
                  </button>
                  <button class="owl-thumb-item detail-thumb-item mb-3" v-if="gallery[3]">
                    <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[3].imagen">
                  </button>
                  <button class="owl-thumb-item detail-thumb-item mb-3" v-if="gallery[4]">
                    <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[4].imagen">
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-10 detail-carousel">
                <div class="ribbon ribbon-info">Fresh</div>
                <div class="ribbon ribbon-primary">Sale</div>
                <div class="owl-carousel detail-slider owl-theme owl-dots-modern" data-slider-id="1">
                  <div class="item" v-if="gallery[0]">
                    <a class="glightbox" :href="$url + '/get_gallery_product/' + gallery[0].imagen"
                      data-title="Modern Jacket 1 - Caption text" data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[0].imagen" alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div class="item" v-if="gallery[1]">
                    <a class="glightbox" :href="$url + '/get_gallery_product/' + gallery[1].imagen"
                      data-title="Modern Jacket 1 - Caption text" data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[1].imagen" alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div class="item" v-if="gallery[2]">
                    <a class="glightbox" :href="$url + '/get_gallery_product/' + gallery[2].imagen"
                      data-title="Modern Jacket 1 - Caption text" data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[2].imagen" alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div class="item" v-if="gallery[3]">
                    <a class="glightbox" :href="$url + '/get_gallery_product/' + gallery[3].imagen"
                      data-title="Modern Jacket 1 - Caption text" data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[3].imagen" alt="Modern Jacket 1">
                    </a>
                  </div>
                  <div class="item" v-if="gallery[4]">
                    <a class="glightbox" :href="$url + '/get_gallery_product/' + gallery[4].imagen"
                      data-title="Modern Jacket 1 - Caption text" data-gallery="product-gallery">
                      <img class="img-fluid" :src="$url + '/get_gallery_product/' + gallery[4].imagen" alt="Modern Jacket 1">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 ps-lg-4 order-1 order-lg-2">
            <ul class="breadcrumb undefined">
              <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
              <li class="breadcrumb-item"><router-link to="/shop">Tienda</router-link></li>
              <li class="breadcrumb-item"><router-link :to="{ name: 'shop', query: { category: product.category } }">{{
                product.category }}</router-link></li>
            </ul>
            <h2 class="mb-4">{{ product.title }}</h2>
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul class="list-inline mb-2 mb-sm-0">
                <li class="list-inline-item h4 fw-light mb-0">{{ convertCurrency(product.price) }}</li>
                <li class="list-inline-item text-muted fw-light" v-if="product.discount">
                  <del>$90.00</del>
                </li>
              </ul>
              <div class="d-flex align-items-center">
                <ul class="list-inline me-2 mb-0">
                  <li class="list-inline-item me-0">
                    <img src="/assets/icons/estrella.png" style="width:15px" alt="">
                  </li>
                  <li class="list-inline-item me-0"><img src="/assets/icons/estrella.png" style="width:15px" alt=""></li>
                  <li class="list-inline-item me-0"><img src="/assets/icons/estrella.png" style="width:15px" alt=""></li>
                  <li class="list-inline-item me-0"><img src="/assets/icons/estrella.png" style="width:15px" alt=""></li>
                  <li class="list-inline-item me-0"><img src="/assets/icons/estrella.png" style="width:15px" alt=""></li>
                </ul><span class="text-muted text-uppercase text-sm">25 reviews</span>
              </div>
            </div>
            <p class="mb-4 text-muted">{{ product.description }}</p>
            <div class="row">
                <div class="col-sm-6 col-lg-12 detail-option mb-3">
                  <h6 class="detail-option-heading">{{ product.variety }}</h6>
                  <label v-for="item in varieties" class="btn btn-sm btn-outline-secondary detail-option-btn-label"
                  :id="'variety_' + item._id" :for="'variety_' + item._id" v-on:click="getVariety(item._id)">{{ item.variety }}
                    <input class="input-invisible" type="radio" name="size" :value="item._id" :id="'variety_' + item._id"
                      required>
                  </label>
                </div>

                <!-- <div class="col-12 detail-option mb-3">
                  <h6 class="detail-option-heading">Colour <span>(required)</span></h6>
                  <ul class="list-inline mb-0 colours-wrapper">
                    <li class="list-inline-item">
                      <label class="btn-colour" for="colour_Blue" style="background-color: #668cb9"> </label>
                      <input class="input-invisible" type="radio" name="colour" value="value_Blue" id="colour_Blue" required>
                    </li>
                    <li class="list-inline-item">
                      <label class="btn-colour" for="colour_White" style="background-color: #fff"> </label>
                      <input class="input-invisible" type="radio" name="colour" value="value_White" id="colour_White" required>
                    </li>
                    <li class="list-inline-item">
                      <label class="btn-colour" for="colour_Violet" style="background-color: #8b6ea4"> </label>
                      <input class="input-invisible" type="radio" name="colour" value="value_Violet" id="colour_Violet" required>
                    </li>
                    <li class="list-inline-item">
                      <label class="btn-colour" for="colour_Red" style="background-color: #dd6265"> </label>
                      <input class="input-invisible" type="radio" name="colour" value="value_Red" id="colour_Red" required>
                    </li>
                  </ul>
                </div> -->
                <div class="col-12 col-lg-6 detail-option mb-5">
                  <label class="detail-option-heading fw-bold">Cantidad</label>
                  <input class="form-control detail-quantity" name="items" type="number" v-model="obj_car.amount">
                </div>
              </div>
              <ul class="list-inline">
                <li class="list-inline-item">
                  <button class="btn btn-dark btn-lg mb-1" type="button" v-on:click="addToCar()"> <i class="fa fa-shopping-cart me-2"></i>Agregar
                    al carrito</button>
                </li>
                <!-- <li class="list-inline-item"><a class="btn btn-outline-secondary mb-1" href="#"> <i class="far fa-heart me-2"></i>Add to wishlist</a></li> -->
              </ul>
              <span class="text-danger" v-if="msj_err">{{ msj_err }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-5">
      <div class="container">
        <ul class="nav nav-tabs flex-column flex-sm-row" role="tablist">
          <li class="nav-item"><a class="nav-link detail-nav-link active" data-bs-toggle="tab"
              href="#additional-information" role="tab">Informcion Adicional</a></li>
          <li class="nav-item"><a class="nav-link detail-nav-link" data-bs-toggle="tab" href="#reviews"
              role="tab">Reviews</a></li>
        </ul>
        <div class="tab-content py-4">

          <div class="tab-pane active" id="additional-information" role="tabpanel">
            <div class="row">
              <div class="col-lg-6">
                <table class="table text-sm">
                  <tbody>
                    <tr>
                      <th class="text-uppercase fw-normal border-0"><b>Producto</b></th>
                      <td class="text-muted border-0" v-if="product.title" :title="product.title"><b>{{
                        product.title.substr(0, 30) }}...</b></td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal "><b>Categoria</b></th>
                      <td class="text-muted "><b>{{ product.category }}</b></td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal "><b>Subcategoria</b></th>
                      <td class="text-muted "><b>{{ product.subcategory }}</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6">
                <table class="table text-sm">
                  <tbody>
                    <tr>
                      <th class="text-uppercase fw-normal "><b>Variedad</b></th>
                      <td class="text-muted "><b>{{ product.title }}</b></td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal border-0"><b>Codigo</b></th>
                      <td class="text-muted border-0"><b>{{ product._id }}</b></td>
                    </tr>
                    <tr>
                      <th class="text-uppercase fw-normal "><b>Fecha</b></th>
                      <td class="text-muted "><b>{{ converDate(product.createdAt) }}</b></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="reviews" role="tabpanel">
            <div class="row mb-5">
              <div class="col-lg-10 col-xl-9">
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image"
                      src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-1.jpg" alt="Han Solo"><span
                      class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Han Solo</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i>
                    </div>
                    <p class="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself
                      transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his
                      head a little he could see his brown belly, slightly domed and divided by arches into stiff sections
                    </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image"
                      src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-2.jpg" alt="Luke Skywalker"><span
                      class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Luke Skywalker</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                    </div>
                    <p class="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any
                      moment. His many legs, pitifully thin compared with the size of the rest of him, waved about
                      helplessly as he looked. &quot;What's happened to me?&quot; he thought. It wasn't a dream. </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image"
                      src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-3.jpg" alt="Princess Leia"><span
                      class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Princess Leia</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-gray-200"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                    </div>
                    <p class="text-muted">His room, a proper human room although a little too small, lay peacefully
                      between its four familiar walls. A collection of textile samples lay spread out on the table. </p>
                  </div>
                </div>
                <div class="review d-flex">
                  <div class="flex-shrink-0 text-center me-4 me-xl-5"><img class="review-image"
                      src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/person-4.jpg" alt="Jabba Hut"><span
                      class="text-uppercase text-muted">Dec 2018</span></div>
                  <div>
                    <h5 class="mt-2 mb-1">Jabba Hut</h5>
                    <div class="mb-2"><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i><i
                        class="fa fa-xs fa-star text-warning"></i><i class="fa fa-xs fa-star text-warning"></i>
                    </div>
                    <p class="text-muted">Samsa was a travelling salesman - and above it there hung a picture that he had
                      recently cut out of an illustrated magazine and housed in a nice, gilded frame. </p>
                  </div>
                </div>
                <div class="py-5 px-3">
                  <h5 class="text-uppercase mb-4">Leave a review</h5>
                  <form class="form" id="contact-form" method="post" action="contact.php">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="name">Your name *</label>
                          <input class="form-control" type="text" name="name" id="name" placeholder="Enter your name"
                            required="required">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="rating">Your rating *</label>
                          <select class="custom-select focus-shadow-0" name="rating" id="rating">
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                            <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                            <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                            <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="email">Your email *</label>
                      <input class="form-control" type="email" name="email" id="email" placeholder="Enter your  email"
                        required="required">
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="review">Review text *</label>
                      <textarea class="form-control" rows="4" name="review" id="review" placeholder="Enter your review"
                        required="required"></textarea>
                    </div>
                    <button class="btn btn-outline-dark" type="submit">Post review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5">
      <div class="container">
        <header class="text-center">
          <h6 class="text-uppercase mb-5">You might also like</h6>
        </header>
        <div class="row">
          <!-- product-->
          <div class="col-lg-2 col-md-4 col-6" v-for="item in product_related">
            <router-link :to="{ name: 'product-shop', params: { slug: item.slug } }">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-danger" v-if="item.discount">Oferta</div><img class="img-fluid"
                    :src="$url + '/get_frontPage_product/' + item.frontPage" alt="product" />
                  <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="detail.html"></a>
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">{{ item.category }}</p>
                  <h3 class="h6 text-uppercase mb-1" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"
                    :title="item.title"><a class="text-dark" href="detail.html">{{ item.title }}</a></h3><span
                    class="text-muted">{{ convertCurrency(item.price) }}</span>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { init_carrusel } from "../../../public/assets/js/theme.d7b4a888";
import axios from 'axios';
import currency_formatter from 'currency-formatter';
import moment from 'moment';
import $ from 'jquery';

export default {

  name: 'ShowProductsPage',
  data() {
    return {
      msj_err: '',
      gallery: '',
      product: '',
      varieties: [],
      product_related: [],
      obj_car: {
        amount: 1
      },
      user_data: JSON.parse(this.$store.state.user),
    }
  },

  methods: {
    init_data() {
      axios.get(this.$url + '/get_product_slug/' + this.$route.params.slug, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        this.product = result.data.product;

        this.obj_car.product = this.product._id;
        this.obj_car.customer = this.user_data._id;

        this.gallery = result.data.gallery;
        this.varieties = result.data.varieties;
        this.init_product_related(this.product.category);
      })
    },

    init_product_related(category) {
      axios.get(this.$url + '/get_product_category/' + category, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        this.product_related = result.data.product
        console.log(result);
      })
    },

    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    },

    converDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getVariety(value){
      this.obj_car.variety = value;
      setTimeout( () => {
        
        $('.detail-option-btn-label').removeClass ('bg_variety');
        $('#variety_'+value).addClass('bg_variety');
      }, 50)
      console.log(this.obj_car);
    },

    addToCar(){
      if(!this.obj_car.variety){
        this.msj_err = 'Seleccione la variedad'; 
      }else if(!this.obj_car.amount){
        this.msj_err = 'Ingrese la cantidad';
      }else if(this.obj_car.amount <= 0 ){
          this.msj_err = 'Ingrese una cantidad valida';
      }else{
        this.msj_err = '';
        console.log(this.obj_car);
        axios.post(this.$url + '/create_product_car', this.obj_car, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : this.$store.state.token
        }
      }).then((result) => {
        this.$socket.emit('send_car', true)
        console.log(result);
      })
      }
      
    }
  },

  beforeMount() {
    init_carrusel.init_galery();
    init_carrusel.init_zoom();
    this.init_data();
  }
}
</script>

<style>link.active,
.detail-nav-link.nav-link:hover,
.detail-nav-link.nav-link:focus {
  color: #ffffff;
  border-color: #fff #fff #7dcaf6 !important;
  background-color: #7dcaf6 !important;
}

.bg_variety{
  background-color: #7dcaf6 !important;
  color: white !important;
  border: none !important;
}

</style>