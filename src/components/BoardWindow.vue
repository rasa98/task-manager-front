<template>  
    <h1>{{ boardTitle }}</h1>
      <draggable class="d-flex flex-row m-2" :list="lists" itemKey="id" ghost-class="ghost">
            <template #item="{element}">
              <ListWindow class="m-2" :listInfo="element" />                 
            </template> 
            <template #footer> 
              <div class="m-2" style="width: 16rem; min-width: 16rem;">                               
                    <FormNew v-if="!flag" :formValues="formValues" @out-of-focus="flipFlag" @text-emitted="addNewList"></FormNew>
                    <button class="btn btn-light" v-show="flag" @click.stop="flipFlag">+ Add another list</button>                  
              </div>
            </template>           
      </draggable>
</template>

<script>  
import ListWindow from '@/components/ListWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'
import draggable from 'vuedraggable'
import axios from 'axios'



export default {
  name: "BoardWindow",
  components: {
    FormNew, ListWindow, draggable
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
    lists() {
        return this.board?.arrayOfLists || [];
    },
    boardTitle() {
        return this.board?.name || ""; 
    }
  },
  mounted() {
    axios.get("boards/1").then(r =>  {
                var data = r.data;               
                this.board = data;
                console.log(data);
            }            
        ).catch((error) => {
        // Handle errors here
        console.error('Error:', error);
    });
  },  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
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
    }  
  }
}
</script>

<style scoped>
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
</style>