export default {
  namespaced: true,
  state() {
    return {
      isAppLoading: false,
      isComponentLoading: false,
      isFetching: false,
      isFetchingPatient: false,
      isFetchingMR: false,
      serverUnavailable: false,
    };
  },
  mutations: {
    IS_APP_LOADING_UPDATED(state, isAppLoading) {
      state.isAppLoading = isAppLoading;
    },
    IS_COMPONENT_LOADING_UPDATED(state, isComponentLoading) {
      state.isComponentLoading = isComponentLoading;
    },
    IS_FETCHING_UPDATED(state, isFetching) {
      state.isFetching = isFetching;
    },
    IS_FETCHING_PATIENT_UPDATED(state, isFetchingPatient) {
      state.isFetchingPatient = isFetchingPatient;
    },
    IS_FETCHING_MRS_UPDATED(state, isFetchingMR) {
      state.isFetchingMR = isFetchingMR;
    },
    SERVER_UNAVAILABLE(state, serverUnavailable) {
      state.serverUnavailable = serverUnavailable;
    },
  },
  actions: {
    setAppLoading(context, isAppLoading) {
      context.commit("IS_APP_LOADING_UPDATED", isAppLoading);
    },
    setComponentLoading(context, isComponentLoading) {
      context.commit("IS_COMPONENT_LOADING_UPDATED", isComponentLoading);
    },
    setIsFetchingState(context, isFetching) {
      context.commit("IS_FETCHING_UPDATED", isFetching);
    },
    setIsFetchingPatientState(context, isFetchingPatient) {
      context.commit("IS_FETCHING_PATIENT_UPDATED", isFetchingPatient);
    },
    setIsFetchingMRState(context, isFetchingMR) {
      context.commit("IS_FETCHING_MRS_UPDATED", isFetchingMR);
    },
    setServerUnavailable(context, serverUnavailable) {
      context.commit("SERVER_UNAVAILABLE", serverUnavailable);
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
    getServerUnavailable(state) {
      return state.serverUnavailable;
    },
    getIsFetchingPatientState(state) {
      return state.isFetchingPatient;
    },
    getIsFetchingMRState(state) {
      return state.isFetchingMR;
    },
  },
};
