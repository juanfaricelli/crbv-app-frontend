import { mapState } from "vuex";
import { genderParser } from "./genderParser";
import { maritalStatusParser } from "./maritalStatusParser";

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
    genderParser(genderValue, update) {
      return genderParser(genderValue, update)
    },
    maritalStatusParser(maritalStatusValue, update) {
      return maritalStatusParser(maritalStatusValue, update);
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
