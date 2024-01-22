<template>
  <template v-if="isComponentLoading">
    <v-progress-circular
      color="blue-lighten-3"
      indeterminate
      :size="60"
    ></v-progress-circular>
  </template>
  <template v-else>
    <!-- <v-card> -->
      <!-- <v-overlay v-model="savingForm" contained persistent :close-on-content-click="false" class="align-center justify-center">
        <v-btn color="success" @click="savingForm = !savingForm"> Hide Overlay </v-btn>
      </v-overlay> -->
      <!-- hihi
      <v-btn
        block
        class="drawer-content__btn--primary"
        @click="savingForm = !savingForm"
      >
        Guardar Paciente
      </v-btn>
    </v-card> -->
    <form @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="Phone Number"
      ></v-text-field>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-select
        v-model="select.value.value"
        :items="items"
        :error-messages="select.errorMessage.value"
        label="Select"
      ></v-select>

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        label="Option"
        type="checkbox"
      ></v-checkbox>

      <v-btn
        class="me-4"
        type="submit"
      >
        submit
      </v-btn>

      <v-btn @click="handleReset">
        clear
      </v-btn>
    </form>
  </template>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PatientNewForm",
  data() {
    return {
      savingForm: false,
    };
  },
  computed: {
    ...mapState({
      isComponentLoading: (state) => state.app.isComponentLoading,
    }),
  },
  methods: {
    ...mapActions({
      setComponentLoading: "app/setComponentLoading",
      getPatientNewForm: "patients/getPatientNewForm",
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
  },
  async created() {
    this.setComponentLoading(true);
    await this.getPatientNewForm();
    this.setComponentLoading(false);
  },
};
</script>

<style>
</style>