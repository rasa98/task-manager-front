<template>
  <board-window v-if="board != null" />
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
      flag: false,
      board: null
    }
  },
  mounted(){
    axios.post('boards', {name: "The guest board"}).then(r => {
      var data = r.data;
      this.board = data;
      console.log("Board data:::: ", data);
    })
  }
  
}
</script>
