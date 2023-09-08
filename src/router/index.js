import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardView from '../views/BoardView.vue';
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
    path: '/board/:boardId',
    name: 'board',
    component: BoardView
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
