import medicalRecords from "@/store/endpoints/medicalRecords";

export default {
  namespaced: true,
  state() {
    return {
      patientConditions: [],
      medicalRecords: [],
    };
  },
  mutations: {
    PATIENT_CONDITIONS_UPDATED(state, patientConditions) {
      state.patientConditions = patientConditions;
    },
    PATIENT_MEDICAL_RECORDS_UPDATED(state, medicalRecords) {
      state.medicalRecords = medicalRecords;
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
    async medicalRecordEntryCreate(context, payload) {
      try {
        // TODO: change this user id
        payload.doctorId = context.rootState.auth.userNickname;
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
        return await medicalRecords.postMedicalRecordEntry(payload);
      } catch (error) {
        console.error("medicalRecordEntryPost error", error);
        context.commit("PATIENT_CONDITIONS_UPDATED", []);
      }
      context.commit("app/IS_FETCHING_UPDATED", false, {
        root: true,
      });
    },
    async getMedicalRecords(context, patientId) {
      try {
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
        const reponse = await medicalRecords.getMedicalRecordEntries(patientId);
        context.commit("PATIENT_MEDICAL_RECORDS_UPDATED", reponse);
        return reponse;
      } catch (error) {
        console.error("medicalRecords error", error);
        context.commit("PATIENT_MEDICAL_RECORDS_UPDATED", []);
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
    getMedicalRecords(state) {
      return state.medicalRecords;
    },
  },
};
