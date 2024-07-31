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
                    <h6 class="header-pretitle">Usuarios</h6>
                    <!-- Title -->
                    <h1 class="header-title"> Nuevo colaborador</h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">Todos los usuarios</a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/collaborator/register_admin" class="nav-link">Nuevo colaborador</router-link>
                      </li>
                    </ul>
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
import SidebarPage from '../components/SidebarPage.vue';
import TopNavPage from '../components/TopNavPage.vue';


export default {
  name: 'DashboardPage',
  components: {
        SidebarPage,
        TopNavPage
    },
}
</script>
