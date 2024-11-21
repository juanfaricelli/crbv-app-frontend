<template>
  <div class="patient-not-found">
    <template v-if="!isComponentLoading && !patientExists">
      <h3 class="mb-6">
        Paciente con ID {{ patientIdSearched }} no encontrado
      </h3>
      <v-btn
        block
        class="drawer-content__btn--primary"
        @click="goToPatientNewForm"
      >
        ¿Crear Paciente?
      </v-btn>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PatientNotFound",
  computed: {
    ...mapState({
      patientData: (state) => state.patients.patientData,
      isComponentLoading: (state) => state.app.isComponentLoading,
    }),
    ...mapGetters({
      patientIdSearched: "patients/getPatientIdSearched",
    }),
    patientExists() {
      return (this.patientData && this.patientData.id_number) || false;
    },
  },
  methods: {
    goToPatientNewForm() {
      this.$router.push({
        name: "patient-new",
        params: { patientId: this.patientIdSearched },
      });
    },
  },
};
</script>

<style scoped>
.patient-not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
