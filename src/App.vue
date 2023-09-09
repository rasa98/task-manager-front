<template>
  <!-- <nav class="navbar navbar-light">
    <div class="d-flex flex-row mx-5">      
      <router-link class="mx-5" to="/">Home</router-link> 
      <router-link class="mx-5" to="/about">About</router-link> 
      <router-link class="mx-5" to="/login">Login</router-link>
    </div>    
  </nav>
  <router-view /> -->
  <navigation-bar/>


  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {  
  components: {
    NavigationBar
  },
  beforeMount() {
    this.$store.commit('initialiseVars');
  }, 
}
</script>


<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
