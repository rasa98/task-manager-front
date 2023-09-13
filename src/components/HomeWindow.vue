<template>
  <div class="d-flex flex-column m-2 children">    
    <h1> {{ msg }}</h1>     
    
    <div class="grid-container">
      <BoardCard
        v-for="(b, index) in boards"
        :key="b.id"
        :board="b"
        class="board-card"
        :style="{ display: index < 12 ? 'block' : 'none' }"
      />
    </div>    
       
    <div style="width: 16rem; min-width: 16rem;">
        <FormNew v-if="!flag" :formValues="formValues" @out-of-focus="flipFlag" @text-emitted="addNewBoard"></FormNew>    
        <button class="btn btn-dark w-100" v-show="flag" @click.stop="flipFlag">+ create new board</button>
    </div>
    
    
    
  </div>
</template>

<script>
import FormNew from '@/components/formComponents/FormNew.vue'
import axios from 'axios'
import BoardCard from './BoardCard.vue'

export default {
  components: { FormNew, BoardCard },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      flag: true,
      formValues: {placeHolder: "Board name", title: "New board", buttonName: "Add Board"},
    }
  },
  computed: {        
      boards() {
          return this.$store.getters["userModule/getBoards"];
      },        
  },
  methods: {
    flipFlag(){
      this.flag = !this.flag;
    },
    addNewBoard(name){
      if (name !== ""){
        const username = this.$store.getters["userModule/getEmail"];
        const endpoint = `boards/${username}/addBoard`;

        axios.post(endpoint, {name: name}).then(r => {
            const board = r.data;
            // add board to global vuex state.
            var vuexBoards = this.$store.getters["userModule/getBoards"];
            vuexBoards.push(board);
            this.$store.dispatch("userModule/updateBoard", vuexBoards);
            this.$router.push(`/board/${board.id}`);
          }
        );// catch....
      }
      this.flipFlag();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.children > div{
  margin: 18px;
  padding: 8px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Maximum of 5 columns */  
  grid-auto-rows: minmax(150px, auto); /* Minimum row height of 150px */
  grid-gap: 10px; /* Adjust the gap between items as needed */
}

.board-card {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  /* Additional styles for your BoardCard component */
}

</style>
