<template>
  <div id="app">
    <HeaderPage></HeaderPage>
    
    <router-view/>

    <FooterPage></FooterPage>
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

export default {

  components: {
    HeaderPage,
    FooterPage
}
}
</script>

