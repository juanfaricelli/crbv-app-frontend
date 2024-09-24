import auth from "@/store/endpoints/auth";

export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: false,
      authError: false,
    };
  },
  mutations: {
    setAuth(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    AUTH_LOGIN_ERROR(state, authError) {
      state.authError = authError;
    },
  },
  actions: {
    // context is a default param
    login(context, logInInformation) {
      context.commit("setAuth", false);
      context.commit("AUTH_LOGIN_ERROR", false);
      context.commit("app/SERVER_UNAVAILABLE", false, {
        root: true,
      });
      auth
        .login(logInInformation)
        .then((data) => {
          context.commit("setAuth", data.authenticated || false);
          context.commit("AUTH_LOGIN_ERROR", [403, 404].includes(data.code));
          context.commit("app/SERVER_UNAVAILABLE", data.code === 500, {
            root: true,
          });
        })
        .catch((error) => {
          console.error("Login at modules failed with error:", error);
          context.commit("setAuth", false);
        });
    },
    logout(context) {
      auth.logout();
      context.commit("setAuth", false);
    },
  },
  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getAuthError(state) {
      return state.authError;
    },
  },
};
