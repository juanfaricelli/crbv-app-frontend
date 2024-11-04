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

          <v-row v-if="isDeceased">
            <v-col cols="12">
              <h3 class="text-h6">Ingrese fecha de deceso</h3>
              <v-text-field
                type="date"
                v-model="form.deceasedDate"
                label="Fecha de deceso"
                required
                :placeholder="'dd/mm/yyyy'"
                :error="formSubmitted && formError.deceasedDate.hasError"
                :error-messages="formError.deceasedDate.message"
                @focus="resetError('deceasedDate')"
                @input="resetError('deceasedDate')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="isVoluntaryRetirement">
            <v-col cols="12">
              <h3 class="text-h6">Ingrese fecha de retiro voluntario</h3>
              <v-text-field
                type="date"
                v-model="form.voluntaryRetirementDate"
                label="Fecha de retiro voluntario"
                required
                :placeholder="'dd/mm/yyyy'"
                :error="
                  formSubmitted && formError.voluntaryRetirementDate.hasError
                "
                :error-messages="formError.voluntaryRetirementDate.message"
                @focus="resetError('voluntaryRetirementDate')"
                @input="resetError('voluntaryRetirementDate')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="isHospitalized">
            <v-col cols="12">
              <h3 class="text-h6">Ingrese fecha de internación</h3>
              <v-text-field
                type="date"
                v-model="form.hospitalizedDate"
                label="Fecha de internación"
                required
                :placeholder="'dd/mm/yyyy'"
                :error="formSubmitted && formError.hospitalizedDate.hasError"
                :error-messages="formError.hospitalizedDate.message"
                @focus="resetError('hospitalizedDate')"
                @input="resetError('hospitalizedDate')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="isRecovered">
            <v-col cols="12">
              <h3 class="text-h6">Ingrese fecha de recuperación</h3>
              <v-text-field
                type="date"
                v-model="form.recoveredDate"
                label="Fecha de recuperación"
                required
                :placeholder="'dd/mm/yyyy'"
                :error="formSubmitted && formError.recoveredDate.hasError"
                :error-messages="formError.recoveredDate.message"
                @focus="resetError('recoveredDate')"
                @input="resetError('recoveredDate')"
              ></v-text-field>
            </v-col>
          </v-row>

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

          <v-btn color="success" @click="saveEntry"> Guardar </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
        deceasedDate: null, // Variable to store date of death
        voluntaryRetirementDate: null, // Variable to store voluntary retirement date
        hospitalizedDate: null, // Variable to store hospitalized date
        recoveredDate: null, // Variable to store recovered date
      },
      formError: {
        specialty: {
          hasError: false,
          message: "",
        },
        summary: {
          hasError: false,
          message: "",
        },
        comments: {
          hasError: false,
          message: "",
        },
        deceasedDate: {
          hasError: false,
          message: "",
        },
        voluntaryRetirementDate: {
          hasError: false,
          message: "",
        },
        hospitalizedDate: {
          hasError: false,
          message: "",
        },
        recoveredDate: {
          hasError: false,
          message: "",
        },
      },
      formSubmitted: false,
    };
  },
  props: {
    fullName: {
      type: String,
      required: true,
    },
    isAppointment: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      patientData: (state) => state.patients.patientData,
      patientConditions: (state) => state.medicalRecords.patientConditions,
    }),
    isDeceased() {
      return (
        this.form.patientCondition ===
        this.patientConditions.find(
          (condition) => condition.name === "Fallecido"
        )._id
      );
    },
    isVoluntaryRetirement() {
      return (
        this.form.patientCondition ===
        this.patientConditions.find(
          (condition) => condition.name === "Retiro Voluntario"
        )._id
      );
    },
    isHospitalized() {
      return (
        this.form.patientCondition ===
        this.patientConditions.find(
          (condition) => condition.name === "Internacion"
        )._id
      );
    },
    isRecovered() {
      return (
        this.form.patientCondition ===
        this.patientConditions.find(
          (condition) => condition.name === "Recuperado"
        )._id
      );
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

      if (this.isDeceased) {
        this.formError.deceasedDate.hasError =
          this.form.deceasedDate === null || this.form.deceasedDate === "";
        this.formError.deceasedDate.message = this.formError.deceasedDate
          .hasError
          ? errorMessage
          : "";
      }
      if (this.isVoluntaryRetirement) {
        this.formError.voluntaryRetirementDate.hasError =
          this.form.voluntaryRetirementDate === null ||
          this.form.voluntaryRetirementDate === "";
        this.formError.voluntaryRetirementDate.message = this.formError
          .voluntaryRetirementDate.hasError
          ? errorMessage
          : "";
      }
      if (this.isHospitalized) {
        this.formError.hospitalizedDate.hasError =
          this.form.hospitalizedDate === null ||
          this.form.hospitalizedDate === "";
        this.formError.hospitalizedDate.message = this.formError
          .hospitalizedDate.hasError
          ? errorMessage
          : "";
      }
      if (this.isRecovered) {
        this.formError.recoveredDate.hasError =
          this.form.recoveredDate === null || this.form.recoveredDate === "";
        this.formError.recoveredDate.message = this.formError.recoveredDate
          .hasError
          ? errorMessage
          : "";
      }

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
        (!this.isDeceased || !this.formError.deceasedDate.hasError) &&
        (!this.isVoluntaryRetirement ||
          !this.formError.voluntaryRetirementDate.hasError) &&
        (!this.isHospitalized || !this.formError.hospitalizedDate.hasError) &&
        (!this.isRecovered || !this.formError.recoveredDate.hasError)
      );
    },
    saveEntry() {
      this.formSubmitted = true;
      if (this.validateForm()) {
        // agregar patient id

        // agregar en el action o en el endpoint
        // agregar user commiter id
        // session id
        this.form.patientId = this.patientData.id_number;
        console.log("Datos guardados:", this.form);
      } else {
        this.formSubmitted = false;
      }
    },
    resetError(field) {
      this.formError[field] = {
        hasError: false,
        message: "",
      };
    },
    formattedDate(dateValue) {
      if (!dateValue) return "";
      const date = new Date(dateValue);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-record-form {
  /* Add your component styles here */
}
</style>
