import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardView from '../views/BoardView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import StatsView from '../views/StatsView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',    
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView, 
    meta: { requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView, 
    meta: { requiresAuth: true }
  },
  {
    path: '/board/:boardId',
    name: 'board',
    component: BoardView,
    meta: { requiresAuth: true }
  },  
  {
    path: '/signup',
    name: 'signup',    
    component: SignUpView
  },
  { 
    path: '/:catchAll(.*)',
    name: 'notFoundPage',
    component: NotFoundPage 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
