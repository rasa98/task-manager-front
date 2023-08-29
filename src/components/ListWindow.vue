<template>
<div class="px-2">
  <div class="card" style="width: 16rem;">    
    <div class="card-body">
        <h5 class="card-title">List title</h5> 
        <div class="d-flex flex-column">            
            <TaskWindow v-for="t in taskList" :key="t" :taskName="t" :taskDescription="t" />                   
        </div>
    </div>
    <div class="card-footer">
        <FormNewTask v-if="!flag" @text-emitted="addNewTask" @cancel-emitting="flipFlag"></FormNewTask>
        <button class="btn btn-primary" v-show="flag" @click="flipFlag">Add task</button>
    </div>    
  </div>
</div>
</template>

<script>
import TaskWindow from '@/components/TaskWindow.vue'
import FormNewTask from '@/components/FormNewTask.vue'


export default {
  name: "ListWindow",
  components: {
    TaskWindow, FormNewTask
  },
  data: function() {
    return {
      taskList: [], 
      flag: true    
    }
  }
  ,  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },  
    addNewTask(msg) {
        this.taskList.push(msg);
        this.flipFlag();
        console.log('taskList value in myComponent:', this.taskList);        
    }  
  }
}
</script>

<style scoped>
    /* img {
        width: 150px;
        height: auto;
        align-self: center;
    } */
</style>