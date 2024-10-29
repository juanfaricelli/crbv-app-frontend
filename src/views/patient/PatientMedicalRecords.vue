<template>
  <div class="patient-medical-records">
    <v-progress-circular
      v-if="isFetching"
      indeterminate
      size="64"
      color="#85B1CC"
    ></v-progress-circular>
    <template v-else>
      <PatientNotFound v-if="!patientExists" />
      <v-container v-else>
        <v-card variant="tonal" color="#85B1CC">
          <v-card-text class="text-left">
            <h1 class="mb-3">Paciente: {{ fullName }}</h1>
            <h2>ID: {{ patientId }}</h2>
            <h3>Legajo:</h3>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PatientNotFound from "@/views/patient/PatientNotFound.vue";

export default {
  name: "PatientMedicalRecords",
  components: {
    PatientNotFound,
  },
  computed: {
    ...mapState({
      patientData: (state) => state.patients.patientData,
    }),
    ...mapGetters({
      patientIdSearched: "patients/getPatientIdSearched",
      isFetching: "app/getIsFetchingState",
    }),
    fullName() {
      return this.patientData
        ? `${this.patientData.first_name} ${this.patientData.last_name}`
        : "";
    },
    patientExists() {
      return (this.patientData && this.patientData.id_number) || false;
    },
    patientId() {
      return this.$route.params.patientId;
    },
    // Add your computed properties here
  },
  created() {
    console.log('created')
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.patient-medical-records {
  /* Add your component styles here */
}
</style>
