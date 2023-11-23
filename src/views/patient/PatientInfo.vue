<template>
  <v-card
    :loading="isComponentLoading"
    :title="
      isComponentLoading
        ? 'Cargando datos del paciente...'
        : (patientData.first_name ? `Datos del Paciente: ${patientData.first_name} ${patientData.last_name}` : '')
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
      <template v-if="!isComponentLoading && parsedPatientInfoHasData">
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
        </v-container>
      </template>
      <template v-if="!isComponentLoading && !parsedPatientInfoHasData">
        <h3 class="mb-6">Paciente con ID {{ patientIdSearched }} no encontrado</h3>
        <v-btn block class="drawer-content__btn--primary" @click="showAlert">
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
      isComponentLoading: (state) => state.app.isComponentLoading,
      patientData: (state) => state.patients.patientData,
    }),
    ...mapGetters({
      parsedPatientInfo: "patients/getParsedPatientInfo",
      patientIdSearched: "patients/getPatientIdSearched",
    }),
    parsedPatientInfoHasData() {
      return this.parsedPatientInfo.length > 0
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
      this.setComponentLoading(true);
      this.patientInfo = {
        column1: [],
        column2: [],
      };
      if (this.parsedPatientInfo.length > 0) {
        const midIndex = Math.ceil(this.parsedPatientInfo.length / 2);
        this.patientInfo = {
          column1: this.parsedPatientInfo.slice(0, midIndex),
          column2: this.parsedPatientInfo.slice(
            midIndex + 1,
            this.parsedPatientInfo.length
          ),
        };
      } else {
        this.patientInfo = {
          column1: [],
          column2: [],
        };
      }
      this.setComponentLoading(false);
    },
    showAlert() {
      alert('goTo Create Patient');
    },
  },
  created() {
    this.setComponentLoading(true);
  },
  watch: {
    parsedPatientInfo: {
      immediate: true,
      handler(value) {
        this.setParsedPatientInfo();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>