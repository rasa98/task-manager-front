<template>
    <div class="my-2">
        <div class="card bg-light" style="width: auto;">            
            <div class="card-body custom" @mouseenter="() => flag=true" @mouseleave="() => flag=false">                
               <TitleEdible style="box-shadow: none;" :initialValue="task.title" @name-update="updateTitle"></TitleEdible>
               <button class="btn btn-secondary done-btn" v-show="flag" @click="none">
                    <img src="../assets/pencil.svg">                        
               </button> 
               <button class="btn btn-secondary del-btn" v-show="flag" @click="deleteTask">
                    <img src="../assets/del-icon.png" style="width: 16px;height:auto;">                        
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
      axios.put(`tasks`, 
        {title: newTaskTitle, id: this.task.id}) 
          .then(r => {
            var updatedTask = r.data;
            console.log("updated task title in backend", updatedTask);  
            this.task.title = newTaskTitle; // if successful -> update locally task                       
          }).catch(error => {
          // Handle errors
          console.error('PUT request error:', error);
      });
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
    /* p {
        text-align: left;
    } */
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
</style>