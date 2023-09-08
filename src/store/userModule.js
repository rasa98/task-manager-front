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