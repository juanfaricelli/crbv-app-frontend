<template>
  <v-list>
    <v-list-item>
      <v-container
        class="rounded-lg mb-6 drawer-content__container"
        @click="$router.push({ name: 'home' })"
      >
        <v-row align="center" no-gutters class="drawer-content__row">
          <v-spacer></v-spacer>
          <v-col align-self="center" class="text-center">
            <v-avatar color="info">
              <v-icon icon="$account"></v-icon>
            </v-avatar>
            <!-- <v-avatar>
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              ></v-img>
            </v-avatar> -->
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
      <v-text-field
        class="mb-2"
        clearable
        label="ID Paciente"
        prepend-icon="$account"
        variant="outlined"
        v-model="patientId"
        @keyup.enter="searchPatient"
      ></v-text-field>
      <v-btn
        block
        class="drawer-content__btn--primary mb-2"
        @click="searchPatient"
      >
        Buscar Paciente
      </v-btn>
      <v-btn
        block
        class="drawer-content__btn--primary mb-2"
        @click="newPatientForm"
      >
        Nuevo Paciente
      </v-btn>
      <v-btn
        v-if="isAdminOrDoctor"
        block
        class="drawer-content__btn--primary mb-2"
        @click="showAlert"
      >
        Ver HC
      </v-btn>
      <v-btn
        v-if="isAdminOrStaff"
        block
        class="drawer-content__btn--primary mb-2"
        @click="showAlert"
      >
        Ver Turnos
      </v-btn>
      <v-btn block class="drawer-content__btn--primary mb-2" @click="showAlert">
        Nuevo Turno
      </v-btn>
      <v-btn
        v-if="isAdminOrStaff"
        block
        class="drawer-content__btn--primary mb-2"
        @click="showAlert"
      >
        Estadisticas
      </v-btn>
      <v-btn
        v-if="isAdminOrDoctor"
        block
        class="drawer-content__btn--primary mb-2"
        @click="showAlert"
      >
        Listar Turnos
      </v-btn>
      <v-btn block class="drawer-content__btn--primary" @click="logout">
        Cerrar Sesión
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DrawerContainer",
  data() {
    return {
      patientId: "",
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: "auth/getIsAdministrator",
      isDoctor: "auth/getIsDoctor",
      isStaff: "auth/getIsStaff",
    }),
    isAdminOrStaff() {
      return this.isAdmin || this.isStaff;
    },
    isAdminOrDoctor() {
      return this.isAdmin || this.isDoctor;
    },
  },
  methods: {
    ...mapActions({
      setComponentLoading: "app/setComponentLoading",
      getPatientById: "patients/getPatientById",
      setPatientIdSearched: "patients/setPatientIdSearched",
      logoutAction: "auth/logout",
    }),
    searchPatient() {
      const { patientId } = this;
      if (this.patientId !== "") {
        this.setComponentLoading(true);
        this.getPatientById(patientId);
        this.setPatientIdSearched(patientId);
        this.$router.push({
          name: "patient-info",
          params: { patientId },
        });
      }
    },
    newPatientForm() {
      this.patientId = "";
      this.setPatientIdSearched("");
      this.$store.commit("patients/PATIENT_DATA_UPDATED", "");
      this.$router.push({ name: "patient-new" });
    },
    showAlert() {
      alert("Alerta de prueba");
    },
    logout() {
      // TODO imrpove this
      if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        this.logoutAction();
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-content {
  &__container {
    cursor: pointer;
    background-color: #a0a7ac;
  }
  &__row {
    height: 45px;
  }
  &__btn {
    &--primary {
      background-color: #85b1cc;
    }
  }
}
</style>