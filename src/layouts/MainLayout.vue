<template>
  <v-layout class="main-layout overflow-hidden">
    <v-app-bar height="150" color="#9EBBE4" prominent>
      <v-app-bar-nav-icon
        v-if="this.$vuetify.display.xs"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        class="main-layout__header text-right justify-center me-15"
      >
        <h1 class="font-weight-bold text-h2 text-basil">Clinica Regional Privada</h1>
        <div class="main-layout__header-divider">
          <v-divider
            :thickness="5"
            class="border-opacity-50 mt-1 text-right"
            color="info"
            width="50%"
          ></v-divider>
        </div>
        <h2 class="font-weight-bold text-h2 text-basil">BELL VILLE</h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="top" temporary>
      <DrawerContent />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-if="!this.$vuetify.display.xs"
      color="#D7DEE3"
      permanent
      width="300"
    >
      <DrawerContent />
    </v-navigation-drawer>
    <v-main
      class="d-flex align-center justify-center"
      color="#D7DEE3"
      style="min-height: 300px"
    >
      <router-view name="content" />
    </v-main>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import DrawerContent from "@/components/DrawerContent.vue";

export default {
  name: "MainLayout",
  components: {
    DrawerContent,
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapActions({
      getPatientNewForm: "patients/getPatientNewForm",
    }),
  },
  async created() {
    await this.getPatientNewForm();
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  overflow-y: hidden;
  &__header {
    h1 {
      color: #303639;
    }
    h2 {
      color: #374955;
    }
    &-divider {
      display: flex !important;
      flex-flow: column !important;
      hr {
        align-self: self-end;
      }
    }
  }
}
</style>