import { mapState, mapActions } from "vuex";

export const helperMethods = {
  computed: {
    ...mapState({
      patientNewFormFields: (state) => state.patients.patientNewFormFields,
      patientData: (state) => state.patients.patientData,
    }),
  },
  methods: {
    dateParser(dateValue, update) {
      let dateParts = dateValue.split("T");
      dateParts = dateParts[0].split("-");
      return update
        ? `${dateParts[0]}-${dateParts[1]}-${dateParts[1]}`
        : `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    },
    genderParser(genderValue) {
      if (typeof genderValue === "string") {
        switch (genderValue) {
          case "male":
          case "Hombre":
            return "Hombre";
          case "female":
          case "Mujer":
            return "Mujer";
          case "nonbinary":
          case "No Binario":
            return "No Binario";
          case "transgender":
          case "Transgenero":
            return "Transgenero";
          case "other":
          case "Prefiero no decir/Otros":
            return "Prefiero no decir/Otros";
          default:
            break;
        }
      } else {
        const truthyValue = Object.entries(genderValue).find((valuePair) => {
          if (valuePair[1]) return valuePair;
        });
        switch (truthyValue[0]) {
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
      }
    },
    maritalStatusParser(maritalStatusValue) {
      if (typeof maritalStatusValue === "string") {
        switch (maritalStatusValue) {
          case "single":
          case "Soltero/a":
            return "Soltero/a";
          case "married":
          case "Casado/a":
            return "Casado/a";
          case "divorced":
          case "Divorciado/a":
            return "Divorciado/a";
          case "widowed":
          case "Viudo/a":
            return "Viudo/a";
          case "cohabiting":
          case "Concubinato":
            return "Concubinato";
          case "civil_union":
          case "Union Civil":
            return "Union Civil";
          default:
            break;
        }
      } else {
        const truthyValue = Object.entries(maritalStatusValue).find(
          (valuePair) => {
            if (valuePair[1]) return valuePair;
          }
        );
        switch (truthyValue[0]) {
          case "single":
            return "Soltero/a";
          case "married":
            return "Casado/a";
          case "divorced":
            return "Divorciado/a";
          case "widowed":
            return "Viudo/a";
          case "cohabiting":
            return "Concubinato";
          case "civil_union":
            return "Union Civil";
          default:
            break;
        }
      }
    },
    locationParser(item) {
      const selectedProvince = this.patientNewFormFields.province.options.find(
        (prov) =>
          prov._id ===
          (this.patientData.province.id || this.patientData.province)
      );
      const location = selectedProvince.cities.find(
        (city) => city._id === item.value
      ).name;
      return location;
    },
    healthInsuraceParser(item) {
      const hiData = item.id || item;
      return this.patientNewFormFields.health_insurance.options.find(
        (hi) => hi._id === hiData
      ).name;
    },
  },
};
