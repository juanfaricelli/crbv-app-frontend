import medicalRecords from "@/store/endpoints/medicalRecords";

export default {
  namespaced: true,
  state() {
    return {
      patientConditions: [],
    };
  },
  mutations: {
    PATIENT_CONDITIONS_UPDATED(state, patientConditions) {
      state.patientConditions = patientConditions;
    },
  },
  actions: {
    async getPatientConditions(context) {
      try {
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
        const response = await medicalRecords.fetchPatientConditions();
        context.commit("PATIENT_CONDITIONS_UPDATED", response);
      } catch (error) {
        console.error("getPatientConditions error", error);
        context.commit("PATIENT_CONDITIONS_UPDATED", []);
      }
      context.commit("app/IS_FETCHING_UPDATED", false, {
        root: true,
      });
    },
  },
  getters: {
    getPatientConditions(state) {
      return state.patientConditions;
    },
  },
};
