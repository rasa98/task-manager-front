import { createStore } from 'vuex'
import userModule from './userModule'

export default createStore({
  state: {
    
  },
  getters: {
    
  },
  mutations: {   
    initialiseVars(state) { 
      const ss = window.sessionStorage;    
      if (ss.getItem('email')) {
          state.userModule.email = JSON.parse(ss.email)
          if (ss.getItem('boards')) 
            state.userModule.boards = JSON.parse(ss.boards)
      }
    }   
  },
  actions: {
      
  },
  modules: {
    userModule
  }
})


