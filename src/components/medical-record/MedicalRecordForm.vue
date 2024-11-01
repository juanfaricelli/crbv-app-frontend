<template>
  <div class="medical-record-form">
    <v-container>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Nombre Completo"
                v-model="form.nombreCompleto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Turno n°"
                v-model="form.turno"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="Especialidad"
                :items="especialidades"
                v-model="form.especialidad"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Estado del Paciente</h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="form.estadoPaciente" row>
                    <v-radio label="Consulta" value="consulta"></v-radio>
                    <v-radio label="Observación" value="observacion"></v-radio>
                    <v-radio label="Crónico" value="cronico"></v-radio>
                    <v-radio label="Retiro voluntario" value="retiro_voluntario"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="form.estadoPaciente" row>
                    <v-radio label="Internación" value="internacion"></v-radio>
                    <v-radio label="Recuperado" value="recuperado"></v-radio>
                    <v-radio label="Iguales Condiciones" value="iguales_condiciones"></v-radio>
                    <v-radio label="Fallecido" value="fallecido"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Gestión de Turno</h3>
              <v-radio-group v-model="form.gestionTurno" row>
                <v-radio label="Gestionado" value="gestionado"></v-radio>
                <v-radio label="Ausente" value="ausente"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-text-field label="Motivo" v-model="form.motivo"></v-text-field>

          <v-textarea
            label="Observaciones"
            v-model="form.observaciones"
          ></v-textarea>

          <v-btn color="success" @click="guardar"> Guardar </v-btn>
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
    };
  },
  props: {
    fullName: {
      type: String,
      required: true,
    },
    isAppointment: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      patientData: (state) => state.patients.patientData,
    }),
    form() {
      return {
        nombreCompleto: this.fullName,
        turno: this.isAppointment ? "1234" : "Observación",
        especialidad: null,
        estadoPaciente: "consulta",
        gestionTurno: "gestionado",
        motivo: "",
        observaciones: "",
      };
    },
  },
  mounted() {
    // Lifecycle hook when the component is mounted
  },
  methods: {
    guardar() {
      // Lógica para guardar los datos del formulario
      console.log("Datos guardados:", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-record-form {
  /* Add your component styles here */
}
</style>
