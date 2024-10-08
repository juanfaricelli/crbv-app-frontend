<template>
  <template v-if="isComponentLoading">
    <v-progress-circular
      color="blue-lighten-3"
      indeterminate
      :size="60"
    ></v-progress-circular>
  </template>
  <template v-else>
    <v-sheet width="50%" class="mx-auto mb-6">
      <v-form fast-fail ref="form">
        <v-container>
          <v-row
            no-gutters
            align="center"
            v-for="field in patientNewFormFields"
            :key="field.name"
          >
            <v-col cols="4"> {{ field.label }} </v-col>
            <v-col>
              <v-select
                v-if="
                  field.inputType === 'dropdown' && field.name !== 'location'
                "
                v-model="fieldRefs[field.name]"
                :placeholder="field.placeholder"
                :items="field.options"
                item-title="name"
                :item-value="dropdownValueType(field.name)"
                :label="field.label"
                required
              ></v-select>
              <v-select
                v-if="
                  field.inputType === 'dropdown' && field.name === 'location'
                "
                v-model="fieldRefs[field.name]"
                :placeholder="field.placeholder"
                :items="locationOptions"
                item-title="name"
                :item-value="dropdownValueType(field.name)"
                :label="field.label"
                required
              ></v-select>
              <v-text-field
                v-if="field.inputType === 'text'"
                v-model="fieldRefs[field.name]"
                :placeholder="field.placeholder"
                :label="field.label"
                required
              ></v-text-field>
              <v-text-field
                v-if="field.inputType === 'number'"
                type="number"
                v-model="fieldRefs[field.name]"
                :label="field.label"
                required
              ></v-text-field>
              <v-text-field
                v-if="field.inputType === 'date'"
                type="date"
                v-model="fieldRefs[field.name]"
                :label="field.label"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="validate">
            Validar y Guardar
          </v-btn>
          <v-btn color="error" class="mt-4" block @click="reset">
            Limpiar Formulario
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </template>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { helperMethods } from "@/helpers/mixins";

export default {
  name: "PatientDataForm",
  mixins: [helperMethods],
  data: () => ({
    fieldRules: {
      id_type: [
        (v) => !!v || "Campo requerido",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    },
    fieldRefs: {
      id_types: "",
      id_number: "",
      born_date: "",
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      blood_type: "",
      health_insurance: "",
      health_insurance_id: "",
      marital_status: "",
      nationality: "",
      country: "",
      province: "",
      location: "",
      street: "",
      street_num: "",
      flat: "",
      flat_num: "",
      phone: "",
      email: "",
    },
    locationOptionsStatic: ["Seleccione provincia"],
  }),
  props: {
    patientId: {
      type: String,
      required: false,
      default: "",
    },
    update: {
      type: String,
      required: false,
      default: "false",
    },
  },
  computed: {
    ...mapState({
      isComponentLoading: (state) => state.app.isComponentLoading,
      patientData: (state) => state.patients.patientData,
    }),
    ...mapGetters({
      patientIdSearched: "patients/getPatientIdSearched",
      patientNewFormFields: "patients/getPatientNewFormFields",
    }),
    locationOptions() {
      return this.locationOptionsStatic;
    },
    provinceSelected() {
      return this.fieldRefs.province || null;
    },
  },
  methods: {
    ...mapActions({
      setComponentLoading: "app/setComponentLoading",
      createPatient: "patients/createPatient",
      updatePatient: "patients/updatePatient",
    }),
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.setComponentLoading(true);
        if (this.update === 'true') {
          await this.updatePatient(this.fieldRefs);
        } else {
          await this.createPatient(this.fieldRefs);
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    dropdownValueType(dropdownField) {
      switch (dropdownField) {
        case "gender":
        case "marital_status":
          return "type";
        case "blood_type":
          return "name";
        default:
          return "_id";
      }
    },
  },
  created() {
    this.setComponentLoading(true);
    if (this.patientId) this.fieldRefs.id_number = this.patientId;
    if (this.update === "true") {
      this.fieldRefs.id_types = this.patientData.id_type.id;
      this.fieldRefs.id_number = this.patientData.id_number;
      this.fieldRefs.born_date = this.dateParser(this.patientData.born_date, true);
      this.fieldRefs.first_name = this.patientData.first_name;
      this.fieldRefs.last_name = this.patientData.last_name;
      this.fieldRefs.age = this.patientData.age;
      this.fieldRefs.gender = this.genderParser(this.patientData.gender);
      this.fieldRefs.blood_type = this.patientData.blood_type;
      this.fieldRefs.health_insurance = this.patientData.health_insurance;
      this.fieldRefs.health_insurance_id = this.patientData.health_insurance_id;
      this.fieldRefs.marital_status = this.maritalStatusParser(this.patientData.marital_status);
      this.fieldRefs.nationality = this.patientData.nationality;
      this.fieldRefs.country = this.patientData.country;
      this.fieldRefs.province = this.patientData.province;
      this.fieldRefs.location = this.patientData.location;
      this.fieldRefs.street = this.patientData.street;
      this.fieldRefs.street_num = this.patientData.street_num;
      this.fieldRefs.flat = this.patientData.flat;
      this.fieldRefs.flat_num = this.patientData.flat_num;
      this.fieldRefs.phone = this.patientData.phone;
      this.fieldRefs.email = this.patientData.email;
    }
    setTimeout(() => this.setComponentLoading(false), 3000);
  },
  watch: {
    patientData: {
      immediate: true,
      handler(value) {
        if (value && value.id_number && !(this.update === "true")) {
          this.$router.push({
            name: "patient-info",
            params: { patientId: value.id_number },
          });
        }
      },
    },
    provinceSelected: {
      immediate: true,
      handler(value) {
        if (
          value &&
          value !== "" &&
          this.patientNewFormFields &&
          this.patientNewFormFields.province
        ) {
          const selectedProvince =
            this.patientNewFormFields.province.options.find(
              (prov) => prov.name === value || prov._id === value.id || prov._id === value
            );
          this.locationOptionsStatic = selectedProvince.cities || [
            "Seleccione provincia",
          ];
        }
      },
    },
    patientIdSearched: {
      immediate: true,
      handler(value) {
        if(value === '') this.fieldRefs.id_number = '';
      },
    }
  },
};
</script>