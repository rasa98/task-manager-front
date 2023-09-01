<template>
  <div class="card" style="width: 16rem; min-width: 16rem;">
    <div class="card-body custom">        
        <TitleEdible :initialValue="listTitle"></TitleEdible> 
          <draggable class="d-flex flex-column" itemKey="id" :list="taskList" ghost-class="ghost" group="tasks">
            <template #item="{element}">
              <TaskWindow :taskDescription="element.title" />                   
            </template>
          </draggable>        
    </div>
    <div class="card-footer">
        <FormNew v-if="!flag" :formValues="formValues" @out-of-focus="flipFlag" @text-emitted="addNewTask"></FormNew>
        <button class="btn btn-light w-100" v-show="flag" @click.stop="flipFlag">Add task</button>
    </div>    
  </div>
</template>

<script>
import TaskWindow from '@/components/TaskWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'
import TitleEdible from './formComponents/TitleEdible.vue'
import draggable from 'vuedraggable'
import axios from 'axios';
// import serverUrl from '@/config';


export default {
  name: "ListWindow",
  components: {
    TaskWindow, FormNew,
    TitleEdible, draggable
  },
  props: {
    listTitle: String
  },
  data: function() {
    return {
      taskList: [], 
      formValues: {placeHolder: "Task info..", title: "New task", buttonName: "Add Task"},
      flag: true,
      drag: false   
    }
  }
  ,  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },  
    addNewTask(name) {      
      if (name !== ''){
        axios.post(`tasks`, {title: name})
          .then(r => {
            var task = r.data;
            this.taskList.push(task);            
          }).catch(error => {
          // Handle errors
          console.error('POST request error:', error);
        });       
      }
      this.flipFlag();          
    }  
  }
}
</script>

<style scoped>
  .custom {
      background-color: rgb(229, 229, 229);
      height: auto;
      flex: 0 0 0;
  }
  .ghost {
    opacity: 0.5;
    background: #c3c3c3;    
  }
</style>