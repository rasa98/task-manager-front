<template>
  <div class="board-card" @click="openBoard" style="position: relative;">
    <div class="board-card-title">{{ board.name }}</div>
    <button class="btn btn-secondary del-btn " v-tooltip.left="`delete board`" @click.stop="showDelDialog(board.id)">
        <img src="../assets/del-icon.png" style="max-width: 100%; max-height: 100%;">                        
    </button>
  </div>
</template>

<script>
import { showDelDialogAndDelete } from './util/delBoardUtil';

export default {
  props: {
    board: Object,
  },
  methods: {
    openBoard() {
      this.$router.push(`/board/${this.board.id}`);
    },
    async showDelDialog(boardId){
        await showDelDialogAndDelete.call(this, boardId);
    }
  },
};
</script>

<style scoped>
.del-btn {  
      position: absolute;
      /* opacity: 0.5;  */
      right: 0;      
      background-color: rgb(226, 226, 226);         
      border: none;
      width: 52px;height:52px;
      bottom: 0;              
  } 
.board-card {
  min-width: 200px;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: min-height 0.3s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* Add hover effect */
.board-card:hover {
  background-color: #f0f0f0;
}

.board-card-title {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
</style>
