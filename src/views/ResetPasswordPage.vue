<template>
  <form @submit.prevent="handleResetSubmit">
    <label>
      <span>Password</span>
      <input
        v-model.trim="v$.password.$model"
        type="password"
        autocomplete="new-password"
      />
      <div class="input__response">
        <ul>
          <li v-for="error of v$.password.$errors" :key="error.$uid">
            {{ error.$message }}
          </li>
        </ul>
      </div>
    </label>
    <label>
      <span>Confirm password</span>
      <input
        v-model.trim="v$.confirm.$model"
        type="password"
        autocomplete="new-password"
      />
      <div class="input__response">
        <ul>
          <li v-for="error of v$.confirm.$errors" :key="error.$uid">
            {{ error.$message }}
          </li>
        </ul>
      </div>
    </label>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import resetPasswordMutation from "@/graphql/mutations/ResetPassword.gql";

export default {
  name: "ResetPasswordPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      id: null,
      password: null,
      confirm: null,
    };
  },
  created() {
    var pathArray = window.location.pathname.split("/");
    console.log(pathArray);
  },
  methods: {
    async handleResetSubmit() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      await this.$apollo.mutate({
        mutation: resetPasswordMutation,
        variables: {
          resetUrl: window.location.href,
          password: this.password,
        },
      });

      window.location.href = "/";
    },
  },
  validations() {
    return {
      password: { required },
      confirm: { sameAsPassword: sameAs(this.password) },
    };
  },
};
</script>
