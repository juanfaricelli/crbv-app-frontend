
export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: false,
    };
  },
  mutations: {
    setAuth(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    // context is a default param
    login(context) {
      // TODO: request user info
      setTimeout(() => {
        context.commit("setAuth", true);
      }, 1000);
    },
    logout(context) {
      context.commit("setAuth", false);
    },
  },
  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
};
