<template>
  <board-window :strBoardId="this.boardId"/>
</template>

<script>  
import BoardWindow from '@/components/BoardWindow.vue'
// import axios from 'axios'



export default {
  name: "BoardView",
  components: {
    BoardWindow
  },
  data(){
    return {     
      // board: null    
    }
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    }
  }
  // async mounted(){
  //   const strBoardId = this.$route.params.boardId;
  //   const endpoint = "boards/sorted/" + strBoardId;
    
  //   try{
  //     const response = await axios.get(endpoint);
  //     const b = response.data;
  //     this.board = b;
  //   } catch (error) {
  //         console.error("Board loading failed:", error);
  //     }

  //   this.flag = true;
  // }
  
}
</script>
