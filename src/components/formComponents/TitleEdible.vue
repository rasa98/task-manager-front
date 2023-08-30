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
      fP: ''
    };
  },
  watch: {
    // Watch for changes to the initialValue prop
    initialValue: {
      immediate: true, // Trigger the watcher immediately on component creation
      handler(newValue) {
        this.inputValue = newValue;
      },
    },
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
.custom {
    font-size: 1.25rem; /* Increase font size */
    font-weight: bold; /* Add font weight */
    background-color: inherit;
    margin-bottom: 0.8rem;    
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