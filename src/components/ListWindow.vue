<template>
  <div class="card" style="width: 16rem;">    
    
    
    
    <div class="card-body custom">        
        <TitleEdible :initialValue="listTitle"></TitleEdible>
        
        <div class="d-flex flex-column">            
            <TaskWindow v-for="t in taskList" :key="t" :taskName="t" :taskDescription="t" />                   
        </div>
    </div>
    <div class="card-footer">
        <FormNew v-if="!flag" :formValues="formValues" @text-emitted="addNewTask"></FormNew>
        <button class="btn btn-light w-100" v-show="flag" @click="flipFlag">Add task</button>
    </div>    
  </div>
</template>

<script>
import TaskWindow from '@/components/TaskWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'
import TitleEdible from './formComponents/TitleEdible.vue'


export default {
  name: "ListWindow",
  components: {
    TaskWindow, FormNew,
    TitleEdible
  },
  props: {
    listTitle: String
  },
  data: function() {
    return {
      taskList: [], 
      formValues: {placeHolder: "Task info..", title: "New task", buttonName: "Add Task"},
      flag: true    
    }
  }
  ,  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },  
    addNewTask(msg) {
      if (msg !== ''){
        this.taskList.push(msg);
      }
      this.flipFlag();
      console.log('taskList value in myComponent:', this.taskList);        
    }  
  }
}
</script>

<style scoped>
  .custom {
      background-color: rgb(229, 229, 229);
  }
</style>