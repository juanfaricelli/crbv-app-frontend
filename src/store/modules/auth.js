import auth from "@/store/endpoints/auth";

export default {
  namespaced: true,
  state() {
    return {
      isAuthenticated: false,
      userAuthType: null,
      userNickname: null,
      authError: false,
      token: null,
      isAdministrator: false,
      isStaff: false,
      isDoctor: false,
      isPatient: false,
      sessionId: null,
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
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId;
    },
    CLEAR_SESSION(state) {
      state.token = null;
      state.isAuthenticated = null;
      state.isAdministrator = false;
      state.userNickname = null;
      state.userAuthType = null;
      state.isStaff = false;
      state.isDoctor = false;
      state.isPatient = false;
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userType");
      localStorage.removeItem("username");
    },
    SET_AUTH_TYPE(state, userAuthType) {
      state.userAuthType = userAuthType;
      state.isAdministrator = userAuthType === "admin";
      state.isStaff = userAuthType === "staff";
      state.isDoctor = userAuthType === "doctor";
      state.isPatient = userAuthType === "patient";
    },
    SET_USERNAME(state, userNickname) {
      state.userNickname = userNickname;
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
          if (data.user) {
            context.commit("SET_AUTH_TYPE", data.user.user_type);
            context.commit("SET_USERNAME", data.user.username);
            context.commit("SET_TOKEN", data.token);
            context.commit("SET_SESSION_ID", data.token);
            localStorage.setItem("sessionToken", data.token);
            localStorage.setItem("sessionId", data.session_id);
            localStorage.setItem("userType", data.user.user_type);
            localStorage.setItem("username", data.user.username);
          }

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
          context.commit("CLEAR_SESSION");
        });
    },
    logout(context) {
      auth.logout();
      context.commit("CLEAR_SESSION");
    },
    preseveToken(context) {
      const token = localStorage.getItem("sessionToken");
      const sessionId = localStorage.getItem("sessionId");
      if (!["undefined", "null", null].includes(token)) {
        context.commit("SET_TOKEN", token);
        context.commit("SET_SESSION_ID", sessionId);
        context.commit("SET_AUTH", true);
      }
    },
    setUserType(context, userType) {
      context.commit("SET_AUTH_TYPE", userType);
    },
    setUsername(context, username) {
      context.commit("SET_USERNAME", username);
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
    getUserNickname(state) {
      return state.userNickname;
    },
    getIsAdministrator(state) {
      return state.isAdministrator;
    },
    getIsStaff(state) {
      return state.isStaff;
    },
    getIsDoctor(state) {
      return state.isDoctor;
    },
    getIsPatient(state) {
      return state.isPatient;
    },
  },
};
