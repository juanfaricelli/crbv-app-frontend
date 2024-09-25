import patients from "@/store/endpoints/patients";
import router from "@/router";

export default {
  namespaced: true,
  state() {
    return {
      patientData: {},
      patientIdSearched: "",
      patientNewFormFields: {},
    };
  },
  mutations: {
    PATIENT_DATA_UPDATED(state, patientData) {
      state.patientData = patientData;
    },
    PATIENT_ID_SEARCHED_UPDATED(state, patientIdSearched) {
      state.patientIdSearched = patientIdSearched;
    },
    PATIENT_NEW_FORM_FIELDS_UPDATED(state, patientNewFormFields) {
      state.patientNewFormFields = patientNewFormFields;
    },
  },
  actions: {
    async getPatientById(context, patientId) {
      try {
        if (!patientId) throw error;
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
        const response = await patients.getPatientById(patientId);
        context.commit("PATIENT_DATA_UPDATED", response);
      } catch (error) {
        console.error("getPatientById error", error);
      }
      context.commit("app/IS_FETCHING_UPDATED", false, { root: true });
    },
    setPatientIdSearched(context, patientIdSearched) {
      context.commit("PATIENT_ID_SEARCHED_UPDATED", patientIdSearched);
    },
    async getPatientNewForm(context) {
      try {
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
        const response = await patients.getPatientNewForm();
        context.commit("PATIENT_NEW_FORM_FIELDS_UPDATED", response);
      } catch (error) {
        console.error("getPatientNewForm error", error);
        context.commit("PATIENT_NEW_FORM_FIELDS_UPDATED", {});
      }
      context.commit("app/IS_FETCHING_UPDATED", false, { root: true });
    },
    async createPatient(context, newPatientData) {
      try {
        const response = await patients.createNewPatient(newPatientData);
        context.commit("PATIENT_DATA_UPDATED", response);
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
      } catch (error) {
        console.error("createPatient error", error);
        context.commit("PATIENT_DATA_UPDATED", {});
      }
      context.commit("app/IS_FETCHING_UPDATED", false, { root: true });
    },
    async updatePatient(context, updatedPatientData) {
      try {
        const response = await patients.updatePatient(updatedPatientData);
        context.commit("PATIENT_DATA_UPDATED", response);
        router.push({
          name: "patient-info",
          params: { patientId: response.id_number },
        });
        context.commit("app/IS_FETCHING_UPDATED", true, { root: true });
      } catch (error) {
        console.error("updatePatient error", error);
        context.commit("PATIENT_DATA_UPDATED", {});
      }
      context.commit("app/IS_FETCHING_UPDATED", false, { root: true });
    },
  },
  getters: {
    getPatientById(state) {
      return state.patientData;
    },
    getPatientIdSearched(state) {
      return state.patientIdSearched;
    },
    getParsedPatientInfo(state) {
      const { patientData } = state;
      if (patientData && patientData.id_number) {
        return [
          { name: "Documento Tipo", value: patientData.id_type.name },
          { name: "Número", value: patientData.id_number },
          { name: "Fecha de Nacimiento", value: patientData.born_date },
          { name: "Nombre", value: patientData.first_name },
          { name: "Apellido", value: patientData.last_name },
          { name: "Edad", value: patientData.age },
          { name: "Sexo", value: patientData.gender },
          { name: "Teléfono", value: patientData.phone },
          { name: "E-mail", value: patientData.email },
          { name: "Obra Social", value: patientData.health_insurance },
          { name: "Nº de Afiliado", value: patientData.health_insurance_id },
          { name: "Estado Civil", value: patientData.marital_status },
          { name: "Nacionalidad", value: patientData.nationality },
          { name: "País", value: patientData.country },
          { name: "Provincia", value: patientData.province },
          { name: "Localidad", value: patientData.location },
          { name: "Calle", value: patientData.street },
          { name: "Altura", value: patientData.street_num },
          { name: "Piso", value: patientData.flat },
          { name: "Depto", value: patientData.flat_num },
          { name: "Grupo Sanguineo", value: patientData.blood_type },
          { name: "Historia Clinica", value: patientData.medical_record },
        ];
      } else {
        return null;
      }
    },
    getPatientNewFormFields(state) {
      return state.patientNewFormFields;
    },
  },
};
