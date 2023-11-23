<template>
  <v-app>
    <LogInLayout v-if="!isAuthenticated" />
    <v-overlay v-model="isAppLoading" class="align-center justify-center">
      <v-progress-circular
        color="blue-lighten-3"
        indeterminate
        :size="60"
      ></v-progress-circular>
    </v-overlay>
    <v-expand-transition
      name="enter-main-layout"
      mode="out-in"
    >
      <MainLayout v-if="isAuthenticated" />
    </v-expand-transition>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import LogInLayout from "@/layouts/LogInLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

export default {
  name: "App",
  components: {
    LogInLayout,
    MainLayout,
  },
  data() {
    return {
      spinnerSize: 20,
    };
  },
  computed: {
    ...mapState({
      isAppLoading: (state) => state.app.isAppLoading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },
};
</script>

<style lang="scss" scoped>
.enter-main-layout-enter-from,
.enter-main-layout-leave-to {
  opacity: 0;
}

.enter-main-layout-enter-active {
  transition: opacity 0.3s ease-out;
}

.enter-main-layout-leave-active {
  transition: opacity 0.3s ease-in;
}

.enter-main-layout-enter-to,
.enter-main-layout-leave-from {
  opacity: 1;
}
</style>