<template>
  <v-main>
    <v-sheet height="350" width="300" class="mx-auto mt-15">
      <v-form v-model="valid" @submit.prevent>
        <table>
          <tr>
            <td>juanTest01</td>
            <td>juanTest01</td>
            <td>
              <v-btn @click="fillCredentials('juanTest01', 'juanTest01')"
                >Action</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>juanTest100</td>
            <td>123qweQWE</td>
            <td>
              <v-btn @click="fillCredentials('juanTest100', '123qweQWE')"
                >Action</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>juanTest101</td>
            <td>123qweQWE</td>
            <td>
              <v-btn @click="fillCredentials('juanTest101', '123qweQWE')"
                >Action</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>juanTest102</td>
            <td>123qweQWE</td>
            <td>
              <v-btn @click="fillCredentials('juanTest102', '123qweQWE')"
                >Action</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>juanTest103</td>
            <td>123qweQWE</td>
            <td>
              <v-btn @click="fillCredentials('juanTest103', '123qweQWE')"
                >Action</v-btn
              >
            </td>
          </tr>
        </table>
        <v-text-field
          v-model="username"
          label="Username or email"
          :rules="usernameRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? '$eye' : '$eye-off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          color="primary"
          prepend-icon="$account"
          class="mt-2"
          :loading="isComponentLoading"
          @click="loginValidation"
          >Log In</v-btn
        >
        <v-progress-linear
          v-if="isComponentLoading"
          indeterminate
          color="primary"
          class="mt-2"
        />
        <v-alert
          v-if="authError"
          closable
          icon="$error"
          text="Incorrect or wrong username or password."
          type="error"
          variant="tonal"
        ></v-alert>
        <v-alert
          v-if="serverUnavailable"
          closable
          icon="$error"
          text="Internal Server Error: Server is unavailable."
          type="error"
          variant="tonal"
        ></v-alert>
      </v-form>
    </v-sheet>
  </v-main>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    username: "",
    password: "",
    show: false,
    usernameRules: [
      (value) => {
        if (value?.length > 3) return true;
        return "Required.";
      },
    ],
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
    ...mapGetters({
      authError: "auth/getAuthError",
      serverUnavailable: "app/getServerUnavailable",
      isComponentLoading: "app/getComponentLoadingState",

    }),
  },
  methods: {
    ...mapActions({
      setAppLoading: "app/setAppLoading",
      login: "auth/login",
      setComponentLoading: "app/setComponentLoading",
    }),
    loginValidation() {
      // check validity
      if (this.username && this.password) {
        this.setComponentLoading(true);
        this.login({ username: this.username, password: this.password });
      }
    },
    fillCredentials(username, password) {
      this.username = username;
      this.password = password;
    },
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$router.push({ name: "home" });
        } else {
          this.$router.push({ name: "login" });
        }
      },
    },
  },
};
</script>

<style>
</style>