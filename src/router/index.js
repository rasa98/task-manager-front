import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',    
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },  
  {
    path: '/signup',
    name: 'signup',    
    component: SignUpView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
