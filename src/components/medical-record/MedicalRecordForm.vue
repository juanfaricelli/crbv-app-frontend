<template>
  <div class="medical-record-form">
    <v-container>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Nombre Completo"
                v-model="form.fullName"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Turno n°"
                :value="appointmentLabel"
                v-model="form.appointment"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="Especialidad"
                :items="especialidades"
                v-model="form.specialty"
                :error="formSubmitted && formError.specialty.hasError"
                :error-messages="formError.specialty.message"
                @focus="resetError('specialty')"
                @change="resetError('specialty')"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Estado del Paciente</h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group
                    v-model="form.patientCondition"
                    row
                    @change="handlePatientConditionSelection"
                  >
                    <v-radio
                      v-for="{ _id, name } in patientConditions.slice(0, 4)"
                      :key="_id"
                      :label="name"
                      :value="_id"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-radio-group
                    v-model="form.patientCondition"
                    row
                    @change="handlePatientConditionSelection"
                  >
                    <v-radio
                      v-for="{ _id, name } in patientConditions.slice(4)"
                      :key="_id"
                      :label="name"
                      :value="_id"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <template v-for="condition in conditionFields">
            <v-row :key="condition.key" v-if="condition.check">
              <v-col cols="12">
                <h3 class="text-h6">{{ condition.label }}</h3>
                <v-text-field
                  type="date"
                  v-model="form[condition.model]"
                  :label="condition.label"
                  required
                  :placeholder="'dd/mm/yyyy'"
                  :error="formSubmitted && formError[condition.model].hasError"
                  :error-messages="formError[condition.model].message"
                  @focus="resetError(condition.model)"
                  @input="resetError(condition.model)"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>

          <v-row v-if="isAppointment">
            <v-col cols="12">
              <h3 class="text-h6">Gestión de Turno</h3>
              <v-radio-group
                v-model="form.appointmentManagement"
                row
                @change="handleAppointmentManagementSelection"
              >
                <v-radio label="Gestionado" value="managed"></v-radio>
                <v-radio label="Ausente" value="absent"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-text-field
            label="Motivo"
            v-model="form.summary"
            :error="formSubmitted && formError.summary.hasError"
            :error-messages="formError.summary.message"
            @focus="resetError('summary')"
            @input="resetError('summary')"
          ></v-text-field>

          <v-textarea
            label="Observaciones"
            v-model="form.comments"
            :error="formSubmitted && formError.comments.hasError"
            :error-messages="formError.comments.message"
            @focus="resetError('comments')"
            @input="resetError('comments')"
          ></v-textarea>

          <v-btn v-if="!isLoading" color="success" @click="saveEntry">
            Guardar
          </v-btn>
          <v-progress-circular
            v-else
            class="medical-records-list__spinner"
            indeterminate
            size="64"
            color="#85B1CC"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MedicalRecordForm",
  data() {
    return {
      especialidades: [
        "Cardiología",
        "Dermatología",
        "Neurología",
        "Pediatría",
        "Oftalmología",
      ],
      appointmentLabel: this.isAppointment ? "1234" : "Observación",
      form: {
        fullName: "",
        appointment: "",
        specialty: null,
        patientCondition: "",
        appointmentManagement: "managed",
        summary: "",
        comments: "",
        deceasedDate: null,
        voluntaryRetirementDate: null,
        hospitalizedDate: null,
        recoveredDate: null,
      },
      formError: {
        specialty: { hasError: false, message: "" },
        summary: { hasError: false, message: "" },
        comments: { hasError: false, message: "" },
        deceasedDate: { hasError: false, message: "" },
        voluntaryRetirementDate: { hasError: false, message: "" },
        hospitalizedDate: { hasError: false, message: "" },
        recoveredDate: { hasError: false, message: "" },
      },
      formSubmitted: false,
      isLoading: false,
    };
  },
  props: {
    fullName: { type: String, required: true },
    isAppointment: { type: Boolean, default: false },
  },
  computed: {
    ...mapState({
      patientData: (state) => state.patients.patientData,
      patientConditions: (state) => state.medicalRecords.patientConditions,
    }),
    isDeceased() {
      return this.checkCondition("Fallecido");
    },
    isVoluntaryRetirement() {
      return this.checkCondition("Retiro Voluntario");
    },
    isHospitalized() {
      return this.checkCondition("Internacion");
    },
    isRecovered() {
      return this.checkCondition("Recuperado");
    },
    conditionFields() {
      return [
        {
          key: "deceasedDate",
          label: "Ingrese fecha de deceso",
          model: "deceasedDate",
          check: this.isDeceased,
        },
        {
          key: "voluntaryRetirementDate",
          label: "Ingrese fecha de retiro voluntario",
          model: "voluntaryRetirementDate",
          check: this.isVoluntaryRetirement,
        },
        {
          key: "hospitalizedDate",
          label: "Ingrese fecha de internación",
          model: "hospitalizedDate",
          check: this.isHospitalized,
        },
        {
          key: "recoveredDate",
          label: "Ingrese fecha de recuperación",
          model: "recoveredDate",
          check: this.isRecovered,
        },
      ];
    },
  },
  created() {
    this.form.fullName = this.fullName;
    this.form.appointment = this.isAppointment
      ? this.isAppointment
      : "no_appointment";
    this.form.patientCondition = this.patientConditions[0]._id;
  },
  methods: {
    ...mapActions("medicalRecords", [
      "medicalRecordEntryCreate",
      "getMedicalRecordsAction",
    ]),
    handlePatientConditionSelection(event) {
      this.form.patientCondition = event.target.value;
    },
    handleAppointmentManagementSelection(event) {
      this.form.appointmentManagement = event.target.value;
    },
    validateForm() {
      const errorMessage = "Este campo es requerido";
      this.formError.specialty.hasError = this.form.specialty === null;
      this.formError.summary.hasError = this.form.summary === "";
      this.formError.comments.hasError = this.form.comments === "";

      this.conditionFields.forEach((field) => {
        if (field.check) {
          this.formError[field.model].hasError =
            this.form[field.model] === null || this.form[field.model] === "";
          this.formError[field.model].message = this.formError[field.model]
            .hasError
            ? errorMessage
            : "";
        }
      });

      this.formError.specialty.message = this.formError.specialty.hasError
        ? errorMessage
        : "";
      this.formError.summary.message = this.formError.summary.hasError
        ? errorMessage
        : "";
      this.formError.comments.message = this.formError.comments.hasError
        ? errorMessage
        : "";

      return (
        !this.formError.specialty.hasError &&
        !this.formError.summary.hasError &&
        !this.formError.comments.hasError &&
        this.conditionFields.every(
          (field) => !field.check || !this.formError[field.model].hasError
        )
      );
    },
    async saveEntry() {
      this.isLoading = true;
      this.formSubmitted = true;
      if (this.validateForm()) {
        this.form.patientId = this.patientData.id_number;
        const newEntry = await this.medicalRecordEntryCreate(this.form);
        if (newEntry && Object.keys(newEntry).length > 0) {
          await this.getMedicalRecordsAction(this.patientData.id_number);
          this.isLoading = false;
          this.$router.push({
            name: "patient-medical-record",
            params: { patientId: this.patientData.id_number },
          });
          this.$store.commit("app/IS_FETCHING_UPDATED", false);
        }
      } else {
        this.isLoading = false;
        this.formSubmitted = false;
      }
    },
    resetError(field) {
      this.formError[field] = { hasError: false, message: "" };
    },
    checkCondition(conditionName) {
      const condition = this.patientConditions.find(
        (condition) => condition.name === conditionName
      );
      return condition && this.form.patientCondition === condition._id;
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-record-form {
  /* Add your component styles here */
}
</style>
