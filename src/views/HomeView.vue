<template>
  <div class="m-4">
    <div class="d-flex col-12">
      <div class="col-4">
        <img alt="Vue logo" src="../assets/logo.png" class="fixed-size-image">
      </div>
      <HomeWindow class="col-8" msg="My boards:"/>
    </div>           
  </div>
</template>

<script>
// @ is an alias to /src
import HomeWindow from '@/components/HomeWindow.vue'

export default {
  name: 'HomeView',
  components: {
    HomeWindow
  },
  data: function() {
    return {      
    }
  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

<style scoped>
.fixed-size-image {
  max-width: 100%; /* Ensure the image doesn't exceed the width of the parent div */
  max-height: 35rem; /* Set a maximum height equivalent to 8 rows */
  width: auto; /* Maintain the aspect ratio */
  height: auto; /* Maintain the aspect ratio */
}
</style>
