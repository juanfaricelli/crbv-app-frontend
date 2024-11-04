<template>
  <div class="patient-medical-records">
    <div v-if="isFetching" class="patient-medical-records__spinner-wrapper">
      <v-progress-circular
        class="patient-medical-records__spinner"
        indeterminate
        size="64"
        color="#85B1CC"
      ></v-progress-circular>
    </div>
    <template v-else>
      <PatientNotFound v-if="!patientExists" />
      <v-container v-else>
        <v-card
          variant="tonal"
          color="#85B1CC"
          class="d-flex align-center justify-space-between pa-5"
        >
          <v-card-text class="text-left">
            <h1 class="mb-3">Paciente: {{ fullName }}</h1>
            <h2>ID: {{ patientId }}</h2>
            <h3>Legajo: {{ patientData.medical_record.toUpperCase() }}</h3>
          </v-card-text>
          <v-card-actions class="d-flex align-center">
            <v-btn
              icon
              variant="elevated"
              color="blue"
              @click="redirectToNewEntry"
            >
              <v-icon :icon="isMedicalRecordPage ? '$list' : '$plus'"></v-icon>
            </v-btn>
            <v-btn
              icon
              variant="elevated"
              color="amber"
              @click="redirectToHistory"
            >
              <v-icon icon="$file"></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <router-view :fullName="fullName"></router-view>
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
    isMedicalRecordPage() {
      return this.$route.name === "patient-medical-record-new-entry";
    },
    // Add your computed properties here
  },
  created() {
    console.log("created");
  },
  methods: {
    redirectToNewEntry() {
      if (this.isMedicalRecordPage) {
        this.$router.push({ name: "patient-medical-record" });
        return;
      }
      this.$router.push({ name: "patient-medical-record-new-entry" });
    },
    redirectToHistory() {
      this.$router.push({ name: "patient-medical-record-history" });
    },
  },
};
</script>

<style lang="scss" scoped>
.patient-medical-records {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__spinner {
    margin: 0 auto;
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
