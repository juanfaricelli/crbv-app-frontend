import users from "@/store/endpoint/users";

export default {
  namespaced: true,
  state() {
    return {
      patientData: {},
      patientIdSearched: "",
    };
  },
  mutations: {
    PATIENT_DATA_UPDATED(state, patientData) {
      state.patientData = patientData;
    },
    PATIENT_ID_SEARCHED_UPDATED(state, patientIdSearched) {
      state.patientIdSearched = patientIdSearched;
    },
  },
  actions: {
    async getPatientById(context, patientId) {
      try {
        const reponse = await users.getPatientById(patientId);
        setTimeout(() => {
          context.commit("PATIENT_DATA_UPDATED", reponse);
        }, 1000);
      } catch (error) {
        console.error("getPatientById error", error);
        context.commit("PATIENT_DATA_UPDATED", {});
      }
    },
    setPatientIdSearched(context, patientIdSearched) {
      context.commit("PATIENT_ID_SEARCHED_UPDATED", patientIdSearched);
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
      if (!!state.patientData.id_number) {
        const patientData = state.patientData;
        const genderParser = () => {
          const truthyValue = Object.entries(patientData.gender).filter(
            ([key, value]) => value === true
          );
          switch (truthyValue[0][0]) {
            case "male":
              return "Hombre";
            case "female":
              return "Mujer";
            case "nonbinary":
              return "No Binario";
            case "transgender":
              return "Transgenero";
            case "other":
              return "Prefiero no decir/Otros";
            default:
              break;
          }
        };
        return [
          { name: "Documento Tipo", value: patientData.id_type.name },
          { name: "Número", value: patientData.id_number },
          { name: "Fecha de Nacimiento", value: "" },
          { name: "Nombre", value: patientData.first_name },
          { name: "Apellido", value: patientData.last_name },
          { name: "Edad", value: patientData.age },
          { name: "Sexo", value: genderParser() },
          { name: "Teléfono", value: patientData.phone },
          { name: "E-mail", value: patientData.email },
          { name: "Obra Social", value: patientData.health_insurance.name },
          { name: "Nº de Afiliado", value: patientData.health_insurance_id },
          { name: "Estado Civil", value: patientData.marital_status },
          { name: "Nacionalidad", value: patientData.nationality },
          { name: "País", value: patientData.country.name },
          { name: "Provincia", value: patientData.province.name },
          { name: "Localidad", value: patientData.location.name },
          { name: "Calle", value: patientData.street },
          { name: "Altura", value: patientData.street_num },
          { name: "Piso", value: patientData.flat },
          { name: "Depto", value: patientData.flat },
          { name: "Grupo Sanguineo", value: patientData.blood_type },
          { name: "Historia Clinica", value: "" },
        ];
      } else {
        return [];
      }
    },
  },
};
