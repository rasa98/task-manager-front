<template>
    <div class="my-2">
        <div class="card bg-light" style="width: auto;">            
            <div class="card-body custom" @mouseenter="() => flag=true" @mouseleave="() => flag=false">                
                <!-- <p class="card-text"> {{ task.title }} </p> -->
               <TitleEdible style="box-shadow: none;" :initialValue="task.title" @name-update="updateTitle"></TitleEdible>
               <button class="btn btn-secondary" v-show="flag" @click="none">
                    <img src="../assets/pencil.svg">                        
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
        task: this.taskInfo
    }
  },
  props: {
    taskInfo: Object    
  },
  methods: {
    updateTitle(newTaskTitle){
      this.task.title = newTaskTitle;
      axios.put(`tasks`, 
        {title: newTaskTitle, id: this.task.id}) 
          .then(r => {
            var updatedTask = r.data;
            console.log("updated task title in backend", updatedTask);              
          }).catch(error => {
          // Handle errors
          console.error('PUT request error:', error);
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
        top: 0;
        right: 0;
        opacity: 0.8;        
    }
    button:hover {
        background-color: rgb(67, 67, 67); 
        border-color: rgb(67, 67, 67);
    }
    .custom:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
</style>