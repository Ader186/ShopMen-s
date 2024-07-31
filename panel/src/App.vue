<template>
  <div id="app">
    <!-- <SidebarPage></SidebarPage> -->
    <notifications group="foo" />
    <router-view/>
  </div>
</template>

<script>
import SidebarPage from './components/SidebarPage.vue';
export default {
  components: {
    SidebarPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh !important;
}


a {
  color: #000000 !important;
}

</style>
