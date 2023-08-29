<template>
        <div class="card" style="width: auto;">            
            <div class="card-body">
                <h5 class="card-title"> {{formValues.title}} </h5>
                <div class="py-2">
                    <textarea class="form-control" v-model="taskDescription" @input="adjustTextareaHeight" :placeholder="formValues.placeHolder"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-secondary" @click="sendTaskName">{{formValues.buttonName}}</button>
                    <button class="btn btn-secondary" @click="cancelAddingTasking">Quit</button>
                </div>                
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            taskDescription: ''
        };
    },
    props: {
        formValues: Object
    },
    methods: {
        adjustTextareaHeight: function(event) {            
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;        
        },  
        sendTaskName() {
            this.$emit('text-emitted', this.taskDescription);
        },
        cancelAddingTasking() {
            this.$emit('cancel-emitting');
        }
    }
}
</script>

<style scoped>
    textarea {
        overflow: hidden;
        overflow-wrap: break-word;
        resize: none;        
    }
</style>