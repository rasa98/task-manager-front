<template>
        <div class="card" style="width: auto;">            
            <div class="card-body" @blur="cancelAdding">
                <h5 class="card-title"> {{formValues.title}} </h5>
                <div class="py-2">
                    <textarea ref="myTextarea" class="form-control" @keydown.enter="buttonAdd" v-model="description" @input="adjustTextareaHeight" :placeholder="formValues.placeHolder"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-secondary" @click="buttonAdd">{{formValues.buttonName}}</button>
                    <button class="btn btn-secondary" @click="cancelAdding">Quit</button>
                </div>                
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            description: ''
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
        buttonAdd() {
            this.$emit('text-emitted', this.description);            
        },
        cancelAdding() {            
            this.$emit('text-emitted', '');
        }
    },
    created() {
        this.$nextTick(() => {
            this.$refs.myTextarea.focus();
        });
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