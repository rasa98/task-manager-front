<template>
        <div class="card" style="width: auto;" ref="myComponent">            
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
        },
        handleDocumentClick(event) {
            // Check if the click target is outside of your component
            const componentElement = this.$refs.myComponent;
            if (componentElement && !componentElement.contains(event.target)) {                
                this.$emit("out-of-focus");
                // console.log("document sensed click and called callback");
            }
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
    },
    mounted () {
        document.addEventListener("click", this.handleDocumentClick);
        // console.log("form successfully mounted and click listener added.");
    },
    beforeUnmount() {
        // Remove the click event listener - no mem leaks
        document.removeEventListener("click", this.handleDocumentClick);
        // console.log("form successfully unmounted and click listener removed.");
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