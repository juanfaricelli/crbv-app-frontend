<template>
  <v-container>
    <v-card variant="tonal" color="#85B1CC">
      <v-card-text class="text-center">
        <h1 class="mb-5">Hola, {{ username }}!! Bienvenid@!</h1>
        <h3 v-if="isAdmin">Area Admin</h3>
        <h3 v-if="isStaff">Area Recepción</h3>
        <h3 v-if="isDoctor">Area Gestión Médica</h3>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      username: "auth/getUserNickname",
      isAdmin: "auth/getIsAdministrator",
      isDoctor: "auth/getIsDoctor",
      isStaff: "auth/getIsStaff",
    }),
  }
}
</script>

<style land="scss" scoped>
</style>