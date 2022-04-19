<template>
  <form class="form" @submit.prevent="handleFormSubmit">
    <label class="field">
      <span class="field__label">Email</span>
      <div class="input">
        <input
          v-model.trim="v$.email.$model"
          type="email"
          class="input__element"
          autocomplete="email"
        />
        <div class="input__response">
          <ul>
            <li v-for="error of v$.email.$errors" :key="error.$uid">
              {{ error.$message }}
            </li>
          </ul>
        </div>
      </div>
    </label>
    <label class="field">
      <span class="field__label">Password</span>
      <div class="input">
        <input
          v-model.trim="v$.password.$model"
          type="password"
          class="input__element"
          autocomplete="current-password"
        />
        <div class="input__response">
          <ul>
            <li v-for="error of v$.password.$errors" :key="error.$uid">
              {{ error.$message }}
            </li>
          </ul>
        </div>
      </div>
    </label>
    <div class="field">
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions } from "vuex";

export default {
  name: "NavigationAccountPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("app", ["attemptLogin"]),
    async handleFormSubmit() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      this.attemptLogin({
        email: this.email,
        password: this.password,
      });
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
};
</script>
