<template>
  <div style="background-color: rgb(250 236 255);">
    <!-- Hero Section-->
    <section class="hero" style="margin-top:130px">
      <div class="container">

        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Chaquetas y tops</h1>
          <div class="row">
            <div class="col-xl-8 offset-xl-2">
              <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <!-- Grid -->
        <div class="products-grid col-xl-9 col-lg-8 order-lg-2">
          <header class="product-grid-header">
            <div class="me-3 mb-3">
              Mostrando <strong>{{ currentPage }}-<span v-if="currentPage * perPage > product.length">{{ product.length
              }}</span><span v-if="currentPage * perPage <= product.length">{{ currentPage * perPage }}</span>
              </strong> de <strong>{{ product.length }} </strong>productos</div>
            <div class="me-3 mb-3">
              <span class="me-2">Por pagina</span>
              <a class="product-grid-header-show" v-bind:class="{ 'active': perPage == 12 }" style="cursor: pointer"
                v-on:click="setPerPage(12)">12</a>
              <a class="product-grid-header-show" v-bind:class="{ 'active': perPage == 18 }" style="cursor: pointer"
                v-on:click="setPerPage(18)">18</a>
            </div>
            <div class="mb-3 d-flex align-items-center"><span class="d-inline-block me-2">Ordenar</span>
              <select class="form-select w-auto border-0" v-model="sort_by" v-on:change="setSortBy()">
                <option value="defecto" selected>Defecto</option>
                <option value="precio +-">Precio mayor</option>
                <option value="precio -+">Precio menor</option>
              </select>
            </div>
          </header>
          <div class="row" id="my-table">
            <!-- product-->
            <div class="col-xl-4 col-6" v-for="item in itemsForList">
              <router-link :to="{name: 'product-shop', params: {slug: item.slug}}">
                <div class="product">
                  <div class="product-image">
                    <div class="ribbon ribbon-danger" v-if="item.discount">Oferta</div><img class="img-fluid"
                      :src="$url + '/get_frontPage_product/' + item.frontPage" alt="product" />
                  </div>
                  <div class="py-2">
                    <p class="text-muted text-sm mb-1">{{ item.category }}</p>
                    <h3 class="h6 text-uppercase mb-1"
                      style="text-overflow: ellipsis; overflow: hidden white-space nowrap;;"><a class="text-dark"
                        href="detail.html">{{ item.title }}</a></h3><span class="text-muted">{{
                          convertCurrency(item.price)
                        }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- Pagination-->
          <b-pagination v-model="currentPage" :total-rows="product.length" :per-page="perPage"
            aria-controls="my-table"></b-pagination>
        </div>
        <!-- / Grid End-->
        <!-- Sidebar-->
        <div class="sidebar col-xl-3 col-lg-4 order-lg-1">
          <div class="sidebar-block px-3 px-lg-0 me-lg-4"><a class="d-lg-none block-toggler" data-bs-toggle="collapse"
              href="#categoriesMenu" aria-expanded="false" aria-controls="categoriesMenu">Categorias de productos</a>
            <div class="expand-lg collapse" id="categoriesMenu">

              <div class="nav nav-pills flex-column mt-4 mt-lg-0" role="menu">

                <template v-for="(item, index) in categories">
                  <div>

                    <template v-if="item.category._id == category_active">
                      <div>
                        <div class="sidebar-menu-item mb-2 active" data-bs-toggle="collapse"
                          :data-bs-target="'#subcategories_' + index" aria-expanded="true" aria-controls="subcategories_0"
                          role="menuitem">
                          <a class="nav-link active" href="#!">
                            <div class="row">
                              <div class="col"><span>{{ item.category.title }}</span></div>
                              <div class="col" style="text-align:right !important"><img src="/assets/media/verde.png"
                                  style="width: 25px" alt=""></div>
                            </div>
                          </a>
                        </div>
                        <div class="collapse show" :id="'subcategories_' + index">
                          <div class="nav nav-pills flex-column ms-3">
                            <a style="cursor: pointer" class="nav-link mb-2"
                              v-on:click="redirectCategory(item.category.title)">Ver todos</a>
                            <a style="cursor: pointer" class="nav-link mb-2" v-for="subitem in item.subcategory"
                              v-on:click="redirectSubcategory(subitem.title, item.category._id)">{{ subitem.title }}</a>
                          </div>
                        </div>
                      </div>
                    </template>

                    <template v-if="item.category._id != category_active">
                      <div>
                        <div class="sidebar-menu-item mb-2" data-bs-toggle="collapse"
                          :data-bs-target="'#subcategories_' + index" aria-expanded="false"
                          :aria-controls="'subcategories_' + index" role="menuitem">
                          <a class="nav-link">
                            <div class="row">
                              <div class="col"><span>{{ item.category.title }}</span></div>
                              <div class="col" style="text-align: right !important;"><img src="/assets/media/verde.png"
                                  style="width:10px" alt=""></div>
                            </div>
                          </a>
                        </div>
                        <div class="collapse" :id="'subcategories_' + index">
                          <div class="nav nav-pills flex-column ms-3">
                            <a style="cursor: pointer" class="nav-link mb-2"
                              v-on:click="redirectCategory(item.category.title)">Ver todos</a>
                            <a style="cursor: pointer" class="nav-link mb-2"
                              v-bind:class="{ 'subcategory': subitem.title == subcategory_active }"
                              v-for="subitem in item.subcategory"
                              v-on:click="redirectSubcategory(subitem.title, item.category._id)">{{ subitem.title }}</a>
                          </div>
                        </div>
                      </div>
                    </template>

                  </div>
                </template>


              </div>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4"><a class="d-lg-none block-toggler" data-bs-toggle="collapse"
              href="#priceFilterMenu" aria-expanded="false" aria-controls="priceFilterMenu">Filtrar por precio</a>
            <div class="expand-lg collapse" id="priceFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Precio</h6>
              <div class="mt-4 mt-lg-0" id="slider-snap" ref="slider"> </div>
              <div class="nouislider-values">
                <div class="min">From<span id="slider-snap-value-lower">{{ convertCurrency(minRange) }}</span></div>
                <div class="max">To<span id="slider-snap-value-upper">{{ convertCurrency(maxRange) }}</span></div>
                <input class="slider-snap-input" type="hidden" name="pricefrom" id="slider-snap-input-lower" value="40">
                <input class="slider-snap-input" type="hidden" name="priceto" id="slider-snap-input-upper" value="110">
              </div>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4"><a class="d-lg-none block-toggler" data-bs-toggle="collapse"
              href="#brandFilterMenu" aria-expanded="true" aria-controls="brandFilterMenu">Filter by brand</a>
            <!-- Brand filter menu - this menu has .show class, so is expanded by default-->
            <div class="expand-lg collapse show" id="brandFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Brands </h6>
              <form class="mt-4 mt-lg-0" action="#">
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="brand0" type="checkbox" name="clothes-brand" checked>
                    <label class="form-check-label" for="brand0">Calvin Klein <small>(18)</small></label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="brand1" type="checkbox" name="clothes-brand" checked>
                    <label class="form-check-label" for="brand1">Levi Strauss <small>(30)</small></label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="brand2" type="checkbox" name="clothes-brand">
                    <label class="form-check-label" for="brand2">Hugo Boss <small>(120)</small></label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="brand3" type="checkbox" name="clothes-brand">
                    <label class="form-check-label" for="brand3">Tomi Hilfiger <small>(70)</small></label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="brand4" type="checkbox" name="clothes-brand">
                    <label class="form-check-label" for="brand4">Tom Ford <small>(110)</small></label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4"> <a class="d-lg-none block-toggler" data-bs-toggle="collapse"
              href="#sizeFilterMenu" aria-expanded="false" aria-controls="sizeFilterMenu">Tallas</a>
            <!-- Size filter menu-->
            <div class="expand-lg collapse" id="sizeFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Talla</h6>
              <form class="mt-4 mt-lg-0" action="#">
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="size0" type="radio" value="small" name="size" checked>
                    <label class="form-check-label" for="size0">Small</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="size1" type="radio" value="medium" name="size">
                    <label class="form-check-label" for="size1">Medium</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="size2" type="radio" value="large" name="size">
                    <label class="form-check-label" for="size2">Large</label>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="form-check">
                    <input class="form-check-input" id="size3" type="radio" value="x-large" name="size"
                      v-on:change="selectedSizes($event)">
                    <label class="form-check-label" for="size3">X-Large</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 me-lg-4"><a class="d-lg-none block-toggler" data-bs-toggle="collapse"
              href="#colourFilterMenu" aria-expanded="false" aria-controls="colourFilterMenu">Colores</a>
            <!-- Size filter menu-->
            <div class="expand-lg collapse" id="colourFilterMenu">
              <h6 class="sidebar-heading d-none d-lg-block">Colores</h6>
              <div class="mt-4 mt-lg-0">
                <ul class="list-inline mb-0 colours-wrapper">
                  <li class="list-inline-item">
                    <label class="btn-colour" for="colour_sidebar_Blue" style="background-color: #000000"
                      v-on:click="selectedColor('negro')"> </label>
                    <input class="input-invisible" type="checkbox" name="colour" value="negro" id="colour_sidebar_negro">
                  </li>
                  <li class="list-inline-item">
                    <label class="btn-colour" for="colour_sidebar_White" style="background-color: #ff0000"
                      v-on:click="selectedColor('rojo')"> </label>
                    <input class="input-invisible" type="checkbox" name="colour" value="rojo" id="colour_sidebar_rojo">
                  </li>
                  <li class="list-inline-item">
                    <label class="btn-colour" for="colour_sidebar_Violet" style="background-color: #ffffff"
                      v-on:click="selectedColor('blanco')"> </label>
                    <input class="input-invisible" type="checkbox" name="colour" value="blanco"
                      id="colour_sidebar_blanco">
                  </li>
                  <li class="list-inline-item">
                    <label class="btn-colour" for="colour_sidebar_Red" style="background-color: #008000"
                      v-on:click="selectedColor('verde')"> </label>
                    <input class="input-invisible" type="checkbox" name="colour" value="verde" id="colour_sidebar_verde">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- /Sidebar end-->
      </div>
    </div>
  </div>
</template>

<script>
import noUiSlider from '../../../public/assets/js/nouislider.min.js';
import currency_formatter from 'currency-formatter';
import axios from 'axios';

export default {
  data() {
    return {
      slider: {
        starMin: 0,
        starMax: 2000,
        min: 0,
        max: 2000,
        start: 40,
        step: 1
      },
      minRange: null,
      maxRange: null,

      product: [],
      product_const: [],
      categories: [],
      category_active: '',
      subcategory_active: '',

      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.product.slice(
          (this.currentPage - 1) * this.perPage, this.currentPage * this.perPage
        )
      },
      sort_by: 'defecto'
    }
  },

  mounted() {
    noUiSlider.create(this.$refs.slider, {
      start: [this.slider.starMin, this.slider.starMax],
      step: this.slider.step,
      range: {
        'min': this.slider.min,
        'max': this.slider.max
      }
    });
    this.$refs.slider.noUiSlider.on('update', (values, handle) => {
      this[handle ? 'maxRange' : 'minRange'] = parseInt(values[handle]);
    });
  },

  beforeMount() {
    axios.get(this.$url + '/get_product_shop', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((result) => {
      this.product_const = result.data;
      this.product = result.data;
      console.log(this.product);
      if (this.$route.query.subcategory) {
        this.initProductSubcategory();
      }
      if (this.$route.query.category) {
        this.initProductCategory();
      }
      console.log(result);
    });
    this.init_categories();
  },

  methods: {
    convertCurrency(number) {
      return currency_formatter.format(number, { code: 'USD' });
    },

    setPerPage(item) {
      this.perPage = item;
    },

    setSortBy() {
      if (this.sort_by == 'defecto') {
        this.product.sort((a, b) => new Date(a.ceatedAt).getTime() < new Date(b.ceatedAt).getTime() ? 1 : -1)
        console.log('defecto');
      }
      if (this.sort_by == 'precio +-') {
        const sort = this.product.sort((a, b) => a.price < b.price ? 1 : -1)
        console.log(sort);
      }
      if (this.sort_by == 'precio -+') {
        this.product.sort((a, b) => a.price > b.price ? 1 : -1);
        console.log('menor');
      }
    },

    init_categories() {
      axios.get(this.$url + '/list_category_product', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        this.categories = result.data;
        if (this.$route.query.subcategory) {
          this.category_active = this.categories.filter(item => item.subcategory.some(subcat => subcat.title == this.$route.query.subcategory))[0].category._id;
        }
        console.log(this.category_active);
      })
    },

    redirectSubcategory(item, category) {
      this.category_active = category;
      this.subcategory_active = item;
      this.$router.push({ name: 'shop', query: { subcategory: item } });
      this.initProductSubcategory();
    },

    initProductSubcategory() {
      console.log(this.$route.query.subcategory);
      this.product = this.product_const.filter(item => item.subcategory == this.$route.query.subcategory)
    },

    redirectCategory(item) {
      this.$router.push({ name: 'shop', query: { category: item } });
      this.initProductCategory();
    },

    initProductCategory() {
      console.log(this.$route.query.category);
      this.product = this.product_const.filter(item => item.category == this.$route.query.category)
    },

    selectedColor(value) {
      this.product = this.product_const.filter(item => item.varieties.some(subitem => subitem.variety == value))
    },

    selectedSizes($event) {
      this.product = this.product_const.filter(item => item.varieties.some(subitem => subitem.variety == $event.target.value))
    }
  },
  watch: {
    $route(to, from) {
      if (!this.$route.query.subcategory && !this.$route.query.category) {
        this.product = this.product_const;
      }
    },

    minRange: function (value) {
      console.log(value);
      this.product = this.product_const.filter(item => item.price >= value);

    },

    maxRange: function (value) {
      console.log(value);
      this.product = this.product_const.filter(item => item.price <= value);

    }
  }
}
</script>
<style>
.sidebar-menu-item[data-bs-toggle="collapse"]::before {
  display: none !important
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: #ffffff !important;
  background-color: #7dcaf6 !important;
}

.noUi-horizontal .noUi-handle {
  background: #7dcaf6 !important;
  border-radius: 5px !important;
}

.noUi-horizontal .noUi-handle {
  width: 1rem !important;
  height: 1.5rem !important;
}

.noUi-horizontal {
  height: 10px !important;
  background: #3b547d !important;
  border: none !important;
}

.subcategory {
  background-color: #683370 !important;
}
</style>