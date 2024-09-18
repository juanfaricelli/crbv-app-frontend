<template>
  <v-main>
    <v-sheet height="350" width="300" class="mx-auto mt-15">
      <v-form v-model="valid" @submit.prevent>
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
          @click="loginValidation"
          >Log In</v-btn
        >
      </v-form>
    </v-sheet>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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

        return "Incorrect or wrong username.";
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
    })
  },
  methods: {
    ...mapActions({
      setAppLoading: 'app/setAppLoading',
      login: 'auth/login',
    }),
    loginValidation() {
      // check validity
      // if (this.valid) {
        this.setAppLoading(true);
        this.login({ username: this.username, password: this.password });
        this.setAppLoading(false);
      // }
    },
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(value) {
        this.setAppLoading(false);
        if (value) {
          this.$router.push({ name: "home" });
        } else {
          this.$router.push({ name: "login" });
        }
      },
    },
  }
};
</script>

<style>
</style>