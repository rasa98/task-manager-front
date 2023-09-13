<template>
    <div class="my-2">
        <div class="card bg-light" style="width: auto;" :class="{ 'border-success border-3': this.task.done }">            
            <div class="card-body custom" @mouseenter="() => flag=true" @mouseleave="() => flag=false">                
               <TitleEdible style="box-shadow: none;" :initialValue="task.title" @name-update="updateTitle"></TitleEdible>
               <button class="btn btn-secondary done-btn" v-show="flag" @click="markTaskAsDone">
                    <img src="../assets/done.png" style="width: 15px;height:15px;">                        
               </button> 
               <button class="btn btn-secondary del-btn" v-show="flag" @click="showDelDialog">
                    <img src="../assets/del-icon.png" style="width: 15px;height:15px;">                        
               </button>               
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
import TitleEdible from './formComponents/TitleEdible.vue' 

export default {
  name: "TaskWindow",
  components: {TitleEdible}, 
  data() {
    return {
        flag: false,
        // task: this.taskInfo
    }
  },
  props: {
    taskInfo: Object    
  },
  computed: {
    task(){
      return this.taskInfo; // can't be null
    }
  },
  methods: {
    updateTitle(newTaskTitle){      
      this.updateTask({title: newTaskTitle});
    },
    updateTask(taskObject){
      taskObject.id = this.task.id;
      axios.put(`tasks`, taskObject) 
          .then(r => {
            var updatedTask = r.data;
            console.log("updated task", updatedTask);  
            this.updateLocallyTask(updatedTask); // if successful -> update locally task                       
          }).catch(error => {
          // Handle errors
          console.error('PUT request error:', error);
      });
    },
    updateLocallyTask(tsk){
      const t = this.task;
      // t.id = tsk.id; id nikad ne menjam
      t.title = tsk.title;
      t.taskOrder = tsk.taskOrder;
      t.done = tsk.done;
      t.parentList = tsk.parentList;
    },
    markTaskAsDone(){
      console.log('current value of done: ', !this.task.done);
      this.updateTask({done: !this.task.done});
    },
    showDelDialog(){
      this.$confirm(
        {
          message: 'Are you sure you wanna delete this task?',
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm
          */
          callback: confirm => {
            if (confirm) {
              this.deleteTask();
            }
          }
        }
      )
    },
    deleteTask(){
      axios.delete(`tasks/${this.task.id}`).then(() => {
        this.$emit('del-tsk', this.task.taskOrder); 
      }).catch(error => {
          // Handle errors
          console.error('DEL task request error:', error);
      });            
    }
  }
}
</script>

<style scoped>  
    
    button {
      position: absolute;
      opacity: 0.65; 
      right: 0;      
      background-color: rgb(159, 157, 157); 
      border-color: rgb(108, 108, 108);
    }
    .done-btn {        
        top: 0;              
    }
    .del-btn {        
        bottom: 0;               
    }
    button:hover {
        background-color: rgb(108, 108, 108);         
    }
    .custom:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    .task-done {
      border-color: 2px #28a745 !important; /* Green border color for done tasks */
    }
    
</style>