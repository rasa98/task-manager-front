<template>
  <div class="about">
    <h1>Guest Board</h1>
  </div>  
  <!-- <div class="d-flex flex-row p-2">       -->
      <!-- <div v-for="l in lists" :key="l" class="m-2">
        <ListWindow :listTitle="l" />
      </div>   -->

      <draggable class="d-flex flex-row m-2" :list="lists" itemKey="id" ghost-class="ghost">
            <template #item="{element}">
              <ListWindow class="m-2" :listTitle="element" />                 
            </template> 
            <template #footer> 
              <div class="m-2" style="width: 16rem; min-width: 16rem;">                               
                    <FormNew v-if="!flag" :formValues="formValues" @out-of-focus="flipFlag" @text-emitted="addNewList"></FormNew>
                    <button class="btn btn-light" v-show="flag" @click.stop="flipFlag">+ Add another list</button>                  
              </div>
            </template>           
      </draggable>

      <!-- <div class="m-2">    
        <FormNew v-if="!flag" style="width: 16rem;" :formValues="formValues" @text-emitted="addNewList"></FormNew>
        <button class="btn btn-light" v-show="flag" @click="flipFlag">+ Add another list</button>
      </div> -->
  <!-- </div> -->
</template>

<script>  
import ListWindow from '@/components/ListWindow.vue'
import FormNew from '@/components/formComponents/FormNew.vue'
import draggable from 'vuedraggable'



export default {
  name: "AboutView",
  components: {
    FormNew, ListWindow, draggable
  },
  data: function() {
    return {
      lists: [], 
      formValues: {placeHolder: "List name", title: "Create new list", buttonName: "Add list"},
      flag: true,
      drag: false    
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
  .ghost {
    opacity: 0.5;
    background: #767676;
  } 
  .d-flex {
    align-items: start;
  } 
</style>