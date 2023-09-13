import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { DropDown } from 'vue3-dropper';
import 'vue3-dropper/dist/base.css';
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';


store.subscribe( (mutation, state) => {
    const ss = window.sessionStorage;
    ss.setItem('email', JSON.stringify(state.userModule.email));  
    ss.setItem('boards', JSON.stringify(state.userModule.boards));  
})

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      // Check if the user is authenticated (you can implement your own logic here)
      const isAuthenticated = store.getters["userModule/getEmail"] !== null;
  
      if (!isAuthenticated) {
        // Redirect to the login page
        next('/login');
      } else {
        // Continue to the restricted page
        next();
      }
    } else {
      // For routes that don't require authentication, proceed normally
      next();
    }
  });

const app = createApp(App);
app.component('DropDown', DropDown);
app.use(Vue3ConfirmDialog).use(store).use(router).mount('#app');
app.component('vue3-confirm-dialog', Vue3ConfirmDialog.default);


