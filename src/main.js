import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue-select/dist/vue-select.css'; // remove maybe not used


store.subscribe( (mutation, state) => {
    localStorage.setItem('email', JSON.stringify(state.userModule.email));  
    localStorage.setItem('boards', JSON.stringify(state.userModule.boards));  
})

createApp(App).use(store).use(router).mount('#app')

