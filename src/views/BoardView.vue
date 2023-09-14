<template>
  <board-window :strBoardId="this.boardId"/>
</template>

<script>  
import BoardWindow from '@/components/BoardWindow.vue'

export default {
  name: "BoardView",
  components: {
    BoardWindow
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    }
  }   
}
</script>
