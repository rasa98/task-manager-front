<template>  
  <navigation-bar/>
  <vue3-confirm-dialog />
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
