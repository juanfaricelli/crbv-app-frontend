import auth from "@/store/endpoints/auth";

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
    login(context, logInInformation) {
      auth
        .login(logInInformation)
        .then(() => {
          // set userType here?
          // check validity of loginData
          context.commit("setAuth", true);
        })
        .catch((error) => {
          // check validity of loginData
          console.error("Login failed:", error);
          context.commit("setAuth", false);
        });
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
