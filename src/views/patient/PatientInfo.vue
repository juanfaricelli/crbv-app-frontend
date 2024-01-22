<template>
  <v-card
    :loading="isComponentLoading"
    :title="
      isComponentLoading
        ? 'Cargando datos del paciente...'
        : patientData && patientData.first_name
        ? `Datos del Paciente: ${patientData.first_name} ${patientData.last_name}`
        : ''
    "
  >
    <v-card-text class="bg-surface-variant">
      <template v-if="isComponentLoading">
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col>
              <PatientInfoTable />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-if="!isComponentLoading && patientExists">
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col>
              <PatientInfoTable :patientInfo="patientInfo.column1" />
            </v-col>
            <v-col v-if="!showMobile">
              <PatientInfoTable :patientInfo="patientInfo.column2" />
            </v-col>
          </v-row>
          <v-row no-gutters v-if="showMobile">
            <v-col>
              <PatientInfoTable :patientInfo="patientInfo.column2" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-btn class="ma-2 w-100" @click="goToPatientUpdate">
                Modificar datos
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import PatientInfoTable from "@/components/patient/PatientInfoTable.vue";

export default {
  name: "PatientInfo",
  components: {
    PatientInfoTable,
  },
  data() {
    return {
      patientInfo: {
        column1: [],
        column2: [],
      },
    };
  },
  computed: {
    ...mapState({
      isFetching: (state) => state.app.isFetching,
      isComponentLoading: (state) => state.app.isComponentLoading,
      patientData: (state) => state.patients.patientData,
    }),
    ...mapGetters({
      parsedPatientInfo: "patients/getParsedPatientInfo",
      patientIdSearched: "patients/getPatientIdSearched",
    }),
    patientExists() {
      return this.patientData && this.patientData.id_number;
    },
    showMobile() {
      const { sm } = this.$vuetify.display;
      return sm;
    },
  },
  methods: {
    ...mapActions({
      setComponentLoading: "app/setComponentLoading",
    }),
    setParsedPatientInfo() {
      this.patientInfo = {
        column1: [],
        column2: [],
      };
      if (this.parsedPatientInfo && this.parsedPatientInfo.length > 0) {
        const midIndex = Math.ceil(this.parsedPatientInfo.length / 2);
        this.patientInfo = {
          column1: this.parsedPatientInfo.slice(0, midIndex),
          column2: this.parsedPatientInfo.slice(
            midIndex,
            this.parsedPatientInfo.length
          ),
        };
      }
    },
    goToPatientNewForm() {
      this.$router.push({
        name: "patient-new",
        params: { patientId: this.patientIdSearched },
      });
    },
    goToPatientUpdate() {
      this.$router.push({
        name: "patient-update",
        params: { patientId: this.patientData.id_number, update: true },
      });
    },
  },
  watch: {
    isFetching: {
      immediate: true,
      handler(value) {
        this.setComponentLoading(true);
        if (!value) {
          this.setParsedPatientInfo();
          this.setComponentLoading(false);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>