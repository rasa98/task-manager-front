<template>
    <div class="my-2">
        <div class="card bg-light" style="width: auto;">            
            <div class="card-body custom" @mouseenter="() => flag=true" @mouseleave="() => flag=false">                
                <p class="card-text"> {{ taskDescription }} </p>
                <button class="btn btn-secondary" v-show="flag" @click="none">
                    <img src="../assets/pencil.svg">                        
                </button>                
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: "TaskWindow",
  data() {
    return {
        flag: false
    }
  },
  props: {
    taskDescription: String
  }
}
</script>

<style scoped>    
    p {
        text-align: left;
    }
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
    .custom {
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.3);
    }
    .custom:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
</style>