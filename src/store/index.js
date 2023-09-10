import { createStore } from 'vuex'
import userModule from './userModule'

export default createStore({
  state: {
    boardId: null,
  },
  getters: {
    getBoardId: (state) => state.boardId,
  },
  mutations: {    
    SET_CURRENT_BOARD(state, boardId) {
      state.boardId = boardId;
    },
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
    getBoardData({ commit }, boardData) {
      // Assuming you have a login API request here
      // After a successful login, set the user's email and boards
      
  
      commit("SET_CURRENT_BOARD", boardData);      
    },    
  },
  modules: {
    userModule
  }
})


