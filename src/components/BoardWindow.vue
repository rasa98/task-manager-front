<template> 
    <div class="d-flex justify-content-center align-items-center mx-2 my-2">      
      <TitleEdible class="myTitle" :initialValue="boardTitle" @name-update="updateBoardName"></TitleEdible>      
      <button class="btn btn-secondary del-btn" v-tooltip.right="'delete this board'" @click="showDelDialog(board.id)">
          <img src="../assets/del-icon.png" style="max-width: 100%; max-height: 100%;">                        
      </button>
      <button class="btn btn-secondary del-btn mx-4" v-tooltip.right="'snapshot current state'" @click="makeSnapshot">
          snapshot                        
      </button>

    </div>
    <draggable class="d-flex flex-row m-2" :list="lists" itemKey="id" ghost-class="ghost" @end="onDragUpdateListsOrdering">
          <template #item="{element, index}">
            <ListWindow class="m-2" :listInfo="element" @del-lst="removeLocalList(index)" />                 
          </template> 
          <template #footer> 
            <div class="m-2" style="width: 16rem; min-width: 16rem;">                               
                  <FormNew v-if="!flag" :formValues="formValues" @out-of-focus="flipFlag" @text-emitted="addNewList"></FormNew>
                  <button class="btn btn-light" v-show="flag" @click.stop="flipFlag">+ Add another list</button>                  
            </div>
          </template>           
    </draggable>

    <div class="toast fixed-bottom m-3" ref="myToast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
      <div class="toast-header">
        <strong class="mr-auto">Success</strong>          
      </div>
      <div class="toast-body">
        Snap was successfully created!
      </div>
    </div>

</template>

<script>  
import ListWindow from '@/components/ListWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'
import TitleEdible from './formComponents/TitleEdible.vue'
import draggable from 'vuedraggable'
import axios from 'axios'
import { showDelDialogAndDelete } from './util/delBoardUtil';
import {Toast} from "bootstrap";



export default {
  name: "BoardWindow",
  components: {
    FormNew, ListWindow, draggable, TitleEdible
  },
  props: {    
    strBoardId: String
  },
  data: function() {
    return {
      board: null,      
      formValues: {placeHolder: "List name", title: "Create new list", buttonName: "Add list"},
      flag: true,
      drag: false    
    }
  },
  computed: {    
    boardTitle() {
      return this.board?.name || ""; 
    },
    lists() {
      return this.board?.arrayOfLists || [];
    }
  },
  watch: {
    strBoardId(/*newValue, oldValue*/) {
      this.fetchBoardFromApi()
    }
  }
  ,   
  mounted() {
    this.fetchBoardFromApi();   
  },  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },
    makeSnapshot(){
      const boardId = this.board.id;

      axios.post(`/boards/${boardId}/create-snapshot`)
        .then((response) => {
          // Handle the successful response here if needed
          console.log('Snapshot created:', response.data);
          this.showToast()
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error creating snapshot:', error);
        });
    },
    async showDelDialog(boardId){  
      await showDelDialogAndDelete.call(this, boardId); 
    },
    showToast() {
      // Show the toast
      const toast = this.$refs.myToast;
      const toastInstance = new Toast(toast);
      toastInstance.show();

      // Hide the toast after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        toastInstance.hide();
      }, 2000);
    },    
    updateBoardName(newName){
      this.board.name = newName; // this is local update, but also need global vuex state for home page and navbar
      const boardIdToUpdate = this.board.id;      

      const index = this.$store.getters['userModule/getBoards'].findIndex((board) => board.id === boardIdToUpdate);

      if (index !== -1) {
        // If the board with the target ID is found, update its name
        console.log('new name:', newName);
        this.$store.commit('userModule/updateBoardName', {index, newName});
      }

      axios.put(`boards`, {name: newName, id: this.board.id}) 
            .then(r => {
              var updatedBoard = r.data;
              console.log("updated new board name in backend", updatedBoard);              
            }).catch(error => {
            // Handle errors
            console.error('PUT board rename request error:', error);
        });  
    },
    async fetchBoardFromApi() {     
      // check if id in route parameter ==  one of the board ids of user
      const allBoardIds = this.$store.getters["userModule/getBoards"];
      if(!allBoardIds.map((board) => board.id.toString()).includes(this.strBoardId)) {
        console.log("That page doesnt exist!!!");
        this.$router.push('/error404');
        return;
      }
      // ---------------------------------------------------------------

      const endpoint = "boards/sorted/" + this.strBoardId;
      
      try{
        const response = await axios.get(endpoint);
        const b = response.data;
        this.board = b;
      } catch (error) {
          console.error("Board loading failed:", error);
      }
      
    },
    addNewList(msg) {
      if (msg !== '') {
        var listOrder = this.lists.length;
        var l = {name: msg, listOrder: listOrder, taskList: []};
        axios.post(`boards/${this.board.id}/addList`, l).then(r =>  {
                    var data = r.data;                                   
                    console.log("After response, added list: ", data);
                    this.board.arrayOfLists.push(data); // todo return only list id and...
                }            
            ).catch((error) => {
            // Handle errors here
            console.error('Error:', error);
        });                     
      }
      this.flipFlag();
    },
    removeLocalList(indexToRemove){
      this.lists.splice(indexToRemove, 1);
    },
    onDragUpdateListsOrdering(evt) {      
      const { oldIndex, newIndex } = evt;
      if (oldIndex == newIndex)
        return;
      const start = Math.min(oldIndex, newIndex);
      const end = start == oldIndex ? newIndex : oldIndex;
      const arrOfL = [];
      var l;
      for (let i = start; i <= end; i++) {
        l = this.lists[i];
        l.listOrder = i; // local change
        arrOfL.push({id: l.id, listOrder: l.listOrder});
      }
      // sync db
      
      axios.put("lists/all", arrOfL).then(r => {
        console.log("data returned: ", r.data);
      }).catch((error) => {
            // Handle errors here
            console.error('Error:', error);
        });  
    }  
  }
}
</script>

<style scoped>
  .myTitle{
    font-weight: bold;
    font-size: 1.25rem;
    max-width: 20rem;
     width: auto;
  }
 
  button {
    width: 16rem;
    height: 3rem;
    text-align: left;    
  }
  .ghost {
    opacity: 0.5;
    background: #767676;
  } 
  .d-flex {
    align-items: start;
  } 
  .del-btn { 
     
      background-color: rgb(226, 226, 226);  
      color: black;       
      border: none;
      width: auto;height:52px;
      /* top: 0;               */
  } 
  .toast.fixed-bottom {
    position: fixed;
    bottom: 20px; 
    left: auto;
    right: 20px; 
  }
</style>