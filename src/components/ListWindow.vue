<template>
  <div class="card" style="width: 16rem; min-width: 16rem;">
    <div class="card-body custom">        
        <TitleEdible style="font-weight: bold;font-size: 1.25rem;" :initialValue="list.name" @name-update="updateListName"></TitleEdible> 
          <draggable class="d-flex flex-column" itemKey="id" :list="taskList" @change="onDragUpdateTasksOrdering" ghost-class="ghost" group="tasks">
            <template #item="{element}">
              <TaskWindow :taskInfo="element" @del-tsk="removeTaskFromListLocally" />                   
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
    listInfo: Object
  },
  data: function() {
    return {
      list: this.listInfo, 
      formValues: {placeHolder: "Task info..", title: "New task", buttonName: "Add Task"},
      flag: true,
      drag: false   
    }
  },
  computed: {
    taskList(){
      return this.list?.taskList || [];
    },
    listId(){
      return this.list.id;
    }
  }
  ,  
  methods: {    
    flipFlag: function() {
        this.flag = !this.flag;
    },  
    addNewTask(name) {      
      if (name !== ''){
        axios.post(`tasks/${this.list.id}/addTask`, 
          {title: name, taskOrder: this.taskList.length}) 
            .then(r => {
              var task = r.data;
              console.log("After response, added task: ", task);              
              this.list.taskList.push(task); // todo return only id and add it
            }).catch(error => {
            // Handle errors
            console.error('POST request error:', error);
        });       
      }
      this.flipFlag();          
    },
    removeTaskFromListLocally(indexToRemove){
      this.taskList.splice(indexToRemove, 1);
    },
    updateListName(newListName) {
      this.list.name = newListName;
      axios.put(`lists`, 
          {name: newListName, id: this.list.id}) 
            .then(r => {
              var updatedList = r.data;
              console.log("updated new list name in backend", updatedList);              
            }).catch(error => {
            // Handle errors
            console.error('PUT request error:', error);
        });       
    },
    async onDragUpdateTasksOrdering(evt) {
      var start, end, el;
      if (evt.added !== undefined){
        start = evt.added.newIndex;
        end = this.taskList.length - 1;
        el = evt.added.element;
        el.parentId = this.listId; // locally update only in added
      } else if (evt.moved !== undefined) {
        start = Math.min(evt.moved.oldIndex, evt.moved.newIndex);
        end = start == evt.moved.oldIndex ? evt.moved.newIndex : evt.moved.oldIndex;
      } else {
        start = evt.removed.oldIndex;
        end = this.taskList.length - 1;
      }

      try {
        await this.onDragUpdateTaskOrder(start, end);
        if (el !== undefined) {
          await this.updateTaskParent(el);
        }
      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
      }
    },
    async onDragUpdateTaskOrder(start, end) {
      const arrOfT = [];
      var t;
      for (let i = start; i <= end; i++) {
        t = this.taskList[i];
        t.taskOrder = i; // local change
        arrOfT.push({ id: t.id, taskOrder: t.taskOrder, title: t.title}); // added title za svaki slucaj..:D
      }
      const response = await axios.put("tasks/all", arrOfT);
      console.log("After db tasks update their order: ", response.data);
      
    },
    async updateTaskParent(updatedTask) {
      
        await axios.put(`tasks`, { id: updatedTask.id, parentId: this.listId });
        // You can add a callback here if needed
      
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