export default {
  namespaced: true,
  state() {
    return {
      isAppLoading: false,
      isComponentLoading: false,
    };
  },
  mutations: {
    setAppLoading(state, isAppLoading) {
      state.isAppLoading = isAppLoading;
    },
    setComponentLoading(state, isComponentLoading) {
      state.isComponentLoading = isComponentLoading;
    },
  },
  actions: {
    setAppLoading(context, isAppLoading) {
      context.commit("setAppLoading", isAppLoading);
    },
    toogleAppLoading(context) {
      context.commit("setAppLoading", !context.getters.getAppLoadingState);
    },
    setComponentLoading(context, isComponentLoading) {
      context.commit("setComponentLoading", isComponentLoading);
    },
    toogleComponentLoading(context) {
      context.commit(
        "setComponentLoading",
        !context.getters.getComponentLoadingState
      );
    },
  },
  getters: {
    getAppLoadingState(state) {
      return state.isAppLoading;
    },
    getComponentLoadingState(state) {
      return state.isComponentLoading;
    },
  },
};
