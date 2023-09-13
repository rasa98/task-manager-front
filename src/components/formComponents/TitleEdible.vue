<template>  
    <textarea class="form-control custom" rows="1" ref="myTextarea" v-if="isEditing" @keydown.enter="handleEnterKey" @input="adjustTextareaHeight" v-model="inputValue" @blur="toggleMode"></textarea>
    <p class="form-control custom" v-else @click="clickOnP">{{ inputValue }}</p>      
</template>

<script>
export default {
  props: {
    initialValue: String, // Define the prop for the initial value
  },
  data() {
    return {
      isEditing: false,
      inputValue: '',
      oldInputValue: ''
    };
  },
  watch: {
    // Watch for changes to the initialValue prop
    initialValue: {
      immediate: true, // Trigger the watcher immediately on component creation
      handler(newValue) {
        this.inputValue = newValue;
        this.oldInputValue = newValue;
      },
    },
    isEditing: {
      handler(newValue) {
        if(newValue == false && this.oldInputValue !== this.inputValue){
          console.log("old ",this.oldInputValue);
          console.log("new ", this.inputValue);
          this.$emit('name-update', this.inputValue);
          this.oldInputValue = this.inputValue;
        }
      },
    }
  },
  methods: {
    toggleMode() {
      this.isEditing = !this.isEditing;
    },
    clickOnP() {
        this.toggleMode()
        this.$nextTick(() => {
            const textarea = this.$refs.myTextarea
            textarea.focus();
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    },
    adjustTextareaHeight: function(event) {            
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;        
    },
    handleEnterKey() {
        this.$refs.myTextarea.blur();        
    }
  },
};
</script>

<style scoped>

.form-control.custom {
  /* Add your common styling here */
  padding: 10px;
  margin: 5px;
  /* text-align: center;   */
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* width: auto; */
  /* max-width: 100%; */
  /* text-overflow: ellipsis; */
  /* Other styles as needed */
}
p {
  cursor: pointer;
  text-align: left;
  border: none;  
}
textarea {
    overflow: hidden;    
    overflow-wrap: break-word;
    resize: none;
}
textarea:focus {
    /* border-color: rgb(240, 31, 31);  */
    outline: solid rgb(160, 160, 160);
}
</style>