<template>
    <div class="p-2">
        <div class="card" style="width: 12rem;">            
            <div class="card-body">                
                <p class="card-text"> {{ taskDescription }} </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: "TaskWindow",
  props: {
    taskDescription: String
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