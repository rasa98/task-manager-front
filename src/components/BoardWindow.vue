<template>  
    <h1>{{ boardTitle }}</h1>
      <draggable class="d-flex flex-row m-2" :list="lists" itemKey="id" ghost-class="ghost" @end="onDragUpdateListsOrdering">
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
      lists: [],
      formValues: {placeHolder: "List name", title: "Create new list", buttonName: "Add list"},
      flag: true,
      drag: false    
    }
  },
  computed: {    
    boardTitle() {
        return this.board?.name || ""; 
    }
  }
  ,
  // watch: {
  //   // Watch for changes to the initialValue prop
  //   lists: {
  //     // immediate: true, // Trigger the watcher immediately on component creation
  //     handler(newValue) {
  //       this.inputValue = newValue;
  //       this.oldInputValue = newValue;
  //     },
  //   },
  //   isEditing: {
  //     handler(newValue) {
  //       if(newValue == false && this.oldInputValue !== this.inputValue){
  //         console.log("old ",this.oldInputValue);
  //         console.log("new ", this.inputValue);
  //         this.$emit('name-update', this.inputValue);
  //         this.oldInputValue = this.inputValue;
  //       }
  //     },
  //   }
  // },
  mounted() {
    axios.get("boards/sorted/1").then(r =>  {
                var data = r.data;               
                this.board = data;
                this.lists = data.arrayOfLists;
                console.log("in mounted of BoardedWindow ", data);
                console.log("lists: ", this.lists);
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
    },
    onDragUpdateListsOrdering(evt) {
      const { oldIndex, newIndex } = evt;
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