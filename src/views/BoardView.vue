<template>
  <board-window v-if="flag" />
</template>

<script>  
import BoardWindow from '@/components/BoardWindow.vue'
import axios from 'axios'



export default {
  name: "AboutView",
  components: {
    BoardWindow
  },
  data(){
    return {
      flag: false      
    }
  },
  async mounted(){
    await axios.post('boards', {name: "The guest board"}).then();
    this.flag = true;
  }
  
}
</script>
