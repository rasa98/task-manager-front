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
      if (localStorage.getItem('email') !== 'undefined') {
          state.userModule.email = JSON.parse(localStorage.email)
          if (localStorage.getItem('boards') !== 'undefined') 
            state.userModule.boards = JSON.parse(localStorage.boards)
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


