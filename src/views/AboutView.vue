<template>
  <div class="about">
    <h1>Guest Board</h1>
  </div>  
  <div class="d-flex flex-row p-2">      
      <div v-for="l in lists" :key="l" class="m-2">
        <ListWindow :listTitle="l" />
      </div>  
      <div class="m-2">    
        <FormNew v-if="!flag" style="width: 16rem;" :formValues="formValues" @text-emitted="addNewList"></FormNew>
        <button class="btn btn-light" v-show="flag" @click="flipFlag">+ Add another list</button>
      </div>
  </div>
</template>

<script>  
import ListWindow from '@/components/ListWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'


export default {
  name: "AboutView",
  components: {
    FormNew, ListWindow
  },
  data: function() {
    return {
      lists: [], 
      formValues: {placeHolder: "List name", title: "Create new list", buttonName: "Add list"},
      flag: true    
    }
  }
  ,  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },  
    addNewList(msg) {
      if (msg !== '') {
        this.lists.push(msg);                        
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
</style>