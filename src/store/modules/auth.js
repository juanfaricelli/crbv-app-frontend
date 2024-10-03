import auth from "@/store/endpoints/auth";

export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: false,
      authError: false,
      token: null,
    };
  },
  mutations: {
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    AUTH_LOGIN_ERROR(state, authError) {
      state.authError = authError;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
    },
  },
  actions: {
    // context is a default param
    login(context, logInInformation) {
      context.commit("SET_AUTH", false);
      context.commit("AUTH_LOGIN_ERROR", false);
      context.dispatch("app/setServerUnavailable", false, {
        root: true,
      });
      auth
        .login(logInInformation)
        .then((data) => {
          context.commit("SET_AUTH", data.authenticated || false);
          context.commit("AUTH_LOGIN_ERROR", [403, 404].includes(data.code));
          context.dispatch("app/setServerUnavailable", data.code === 500, {
            root: true,
          });
          context.dispatch("app/setComponentLoading", false, {
            root: true,
          });

          const token = data.token;
          context.commit("SET_TOKEN", token);
          localStorage.setItem("sessionToken", token);
        })
        .catch((error) => {
          console.error("Login at modules failed with error:", error);
          context.commit("SET_AUTH", false);
        });
    },
    logout(context) {
      auth.logout();
      localStorage.removeItem("sessionToken");
      context.commit("CLEAR_TOKEN");
      context.commit("SET_AUTH", false);
    },
    preseveToken(context) {
      const token = localStorage.getItem("sessionToken");
      if (!["undefined", null].includes(token)) {
        context.commit("SET_TOKEN", token);
        context.commit("SET_AUTH", true);
      }
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
