import auth from "@/store/endpoints/auth";

export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: false,
      userAuthType: null,
      userProfile: null,
      authError: false,
      token: null,
      isAdministrator: false,
      isStaff: false,
      isDoctor: false,
      isPatient: false,
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
    SET_AUTH_TYPE(state, userAuthType) {
      state.userAuthType = userAuthType;
      state.isAdministrator = userAuthType === "admin";
      state.isStaff = userAuthType === "staff";
      state.isDoctor = userAuthType === "doctor";
      state.isPatient = userAuthType === "patient";
    },
    SET_USER_PROFILE(state, userProfile) {
      state.userProfile = userProfile;
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
          context.commit("SET_AUTH_TYPE", data.user.user_type || null);
          context.commit("SET_USER_PROFILE", data.user.username || null);
          context.commit("SET_TOKEN", data.token || null);
          localStorage.setItem("sessionToken", data.token || null);

          context.commit("AUTH_LOGIN_ERROR", [403, 404].includes(data.code));
          context.dispatch("app/setServerUnavailable", data.code === 500, {
            root: true,
          });
          context.dispatch("app/setComponentLoading", false, {
            root: true,
          });
        })
        .catch((error) => {
          console.error("Login at modules failed with error:", error);
          context.commit("SET_AUTH", false);
          context.commit("SET_AUTH_TYPE", null);
          context.commit("SET_USER_PROFILE", null);
          context.commit("SET_TOKEN", null);
          localStorage.setItem("sessionToken", null);
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
    getUserAuthType(state) {
      return state.userAuthType;
    },
  },
};
