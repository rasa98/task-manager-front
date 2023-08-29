<template>
  <div class="about">
    <h1>Guest Board</h1>
  </div>  
  <div class="d-flex flex-row">      
      <ListWindow/>      
  </div>
  </template>

<script>  
import ListWindow from '@/components/ListWindow.vue'

export default {
  name: 'AboutView',
  components: {    
    ListWindow,
  }
}
</script>