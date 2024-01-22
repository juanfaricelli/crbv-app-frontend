export default {
  namespaced: true,
  state() {
    return {
      isAppLoading: false,
      isComponentLoading: false,
      isFetching: false,
    };
  },
  mutations: {
    setAppLoading(state, isAppLoading) {
      state.isAppLoading = isAppLoading;
    },
    setComponentLoading(state, isComponentLoading) {
      state.isComponentLoading = isComponentLoading;
    },
    IS_APP_LOADING_UPDATED(state, isAppLoading) {
      state.isAppLoading = isAppLoading;
    },
    IS_COMPONENT_LOADING_UPDATED(state, isComponentLoading) {
      state.isComponentLoading = isComponentLoading;
    },
    IS_FETCHING_UPDATED(state, isFetching) {
      state.isFetching = isFetching;
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
    setIsFetchingState(context, isFetching) {
      context.commit("IS_FETCHING_UPDATED", isFetching);
    },
  },
  getters: {
    getAppLoadingState(state) {
      return state.isAppLoading;
    },
    getComponentLoadingState(state) {
      return state.isComponentLoading;
    },
    getIsFetchingState(state) {
      return state.isFetching;
    },
  },
};
