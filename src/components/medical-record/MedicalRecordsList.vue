<template>
  <div class="medical-records-list">
    <div v-if="isFetching" class="medical-records-list__spinner-wrapper">
      <v-progress-circular
        class="medical-records-list__spinner"
        indeterminate
        size="64"
        color="#85B1CC"
      ></v-progress-circular>
    </div>
    <v-card v-else class="mx-auto">
      <template v-if="medicalRecordsGetter.length === 0">
        <v-card-title class="text-center">
          <h2>No se encontraron registros médicos</h2>
        </v-card-title>
      </template>
      <template v-else>
        <v-list v-for="record in medicalRecordsGetter" :key="record._id">
          <v-list-group :value="record._id" v-model="openedGroups">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="$file"
                :active-class="'medical-records-list__record-active'"
              >
                <div class="medical-records-list__record-summary">
                  <div><strong>Resumen:</strong> {{ record.summary }}</div>
                  <div>
                    <strong>Fecha:</strong> {{ formatDate(record.createdAt) }}
                  </div>
                  <div><strong>Autor:</strong> {{ record.doctorId }}</div>
                  <div>
                    <strong>Especialidad:</strong> {{ record.specialty }}
                  </div>
                </div>
              </v-list-item>
            </template>
            <v-list-item class="medical-records-list__record-details--active">
              <div class="medical-records-list__record-details-wrapper">
                <div class="medical-records-list__record-details">
                  <div>
                    <strong>Turno:</strong>
                    {{ appointmentLegend(record.appointment) }}
                  </div>
                  <div>
                    <strong>Estado:</strong>
                    {{ patientConditionLegend(record.patientCondition) }}
                  </div>
                  <div>
                    <strong>Atención:</strong>
                    {{ managementLegend(record.appointmentManagement) }}
                  </div>
                </div>
                <div><strong>Resumen:</strong> {{ record.summary }}</div>
                <div><strong>Descripcion:</strong> {{ record.comments }}</div>
                <div v-if="record.deceasedDate">
                  <strong>Fecha de Fallecimiento:</strong>
                  {{ formatDate(record.deceasedDate) }}
                </div>
                <div v-if="record.voluntaryRetirementDate">
                  <strong>Fecha de Retiro Voluntario:</strong>
                  {{ formatDate(record.voluntaryRetirementDate) }}
                </div>
                <div v-if="record.hospitalizedDate">
                  <strong>Fecha de Hospitalización:</strong>
                  {{ formatDate(record.hospitalizedDate) }}
                </div>
                <div v-if="record.recoveredDate">
                  <strong>Fecha de Recuperación:</strong>
                  {{ formatDate(record.recoveredDate) }}
                </div>
              </div>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "MedicalRecordsList",
  data: () => ({
    openedGroups: [],
  }),
  computed: {
    ...mapState({
      patientConditions: (state) => state.medicalRecords.patientConditions,
    }),
    ...mapGetters({
      medicalRecordsGetter: "medicalRecords/getMedicalRecordsGetter",
      patientConditions: "medicalRecords/getPatientConditions",
      isFetching: "app/getIsFetchingMRState",
    }),
  },
  created() {
    this.setMedicalRecordItems();
  },
  methods: {
    setMedicalRecordItems() {
      if (Array.isArray(this.medicalRecordsGetter) && this.medicalRecordsGetter.length !== 0) {
        this.medicalRecordItems = this.medicalRecordsGetter.map((mr) => ({
          _id: mr._id,
          appointment: mr.appointment,
          specialty: mr.specialty,
          patientCondition: mr.patientCondition,
          appointmentManagement: mr.appointmentManagement,
          summary: mr.summary,
          comments: mr.comments,
          deceasedDate: mr.deceasedDate,
          voluntaryRetirementDate: mr.voluntaryRetirementDate,
          hospitalizedDate: mr.hospitalizedDate,
          recoveredDate: mr.recoveredDate,
          patientId: mr.patientId,
          doctor_id: mr.doctor_id,
          createdAt: mr.createdAt,
        }));
      } else {
        this.medicalRecordItems = [];
      }
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    appointmentLegend(appointment) {
      return appointment === "no_appointment"
        ? "Observacion/Sin Turno"
        : appointment;
    },
    patientConditionLegend(condition) {
      return this.patientConditions.find((c) => c._id === condition).name;
    },
    managementLegend(management) {
      return management === "managed" ? "Atendido" : "No Atendido";
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-records-list {
  &__record-summary,
  &__record-details {
    display: flex;
    justify-content: space-evenly;
    text-align: left;
    font-weight: bold;
    div {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 130ch;
    }
  }
  &__record-details {
    font-weight: normal;
    &-wrapper {
      display: flex;
      flex-flow: column;
      gap: 10px;
    }
    &--active {
      background-color: #d7dee3; /* Change this to your desired active color */
    }
  }
  &__record-active {
    background-color: #e0f7fa; /* Change this to your desired active color */
  }
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
