const state = {
    email: null,
    boards: [],
  };
  
  const mutations = {
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    updateBoardName(state, { index, newName }) {
      // Check if the index is valid
      if (index >= 0 && index < state.boards.length) {
        // Update the name of the board at the specified index
        console.log(newName);
        state.boards[index].name = newName;
      }
    },
  };
  
  const actions = {
    login({ commit }, userData) {
      // Assuming you have a login API request here
      // After a successful login, set the user's email and boards
      const { email, boards } = userData;
  
      commit("SET_EMAIL", email);
      commit("SET_BOARDS", boards);
    },
    updateBoard({ commit }, boards) {     
      
      commit("SET_BOARDS", boards);
    },
    restartUser({ commit },) {
       
      commit("SET_EMAIL", null);
      commit("SET_BOARDS", []);
    },
  };
  
  const getters = {
    getEmail: (state) => state.email,
    getBoards: (state) => state.boards,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };