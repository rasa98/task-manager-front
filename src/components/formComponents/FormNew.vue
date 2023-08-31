<template>
        <div class="card" style="width: auto;">            
            <div class="card-body">
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
            var ta = this.$refs.myTextarea;            
            const itemPosition = this.$el.getBoundingClientRect();            
            if(itemPosition.left < 0 || itemPosition.right >  window.innerWidth){
                var itemLength = itemPosition.right - itemPosition.left;                
                var amount = 0;                
                if(itemPosition.left < 0) {
                    amount -= itemLength;
                }
                else{
                    amount += itemLength;
                }                  
                
            }
            if(itemPosition.top < 0 || itemPosition.bottom >  window.innerHeight){                
                var itemHeight = itemPosition.bottom - itemPosition.top;                
                var amount2 = 0;               
                if(itemPosition.top < 0) {
                    amount2 -= itemHeight;
                }
                else{
                    amount2 += itemHeight;
                }                         
            }
            window.scrollBy(amount, amount2);
            ta.focus();
        })            
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