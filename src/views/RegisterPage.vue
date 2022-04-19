<template>
  <h1>Register Page</h1>

  <form class="form" @submit.prevent="handleFormSubmit">
    <label class="field" :class="{ 'field--error': v$.firstName.$error }">
      <span class="field__label">First Name</span>
      <div class="input">
        <input
          v-model.trim="v$.firstName.$model"
          type="text"
          class="input__element"
          autocomplete="given-name"
        />
        <div class="input__response">
          <ul>
            <li v-for="error of v$.firstName.$errors" :key="error.$uid">
              {{ error.$message }}
            </li>
          </ul>
        </div>
      </div>
    </label>

    <label class="field" :class="{ 'field--error': v$.lastName.$error }">
      <span class="field__label">Last Name</span>
      <div class="input">
        <input
          v-model.trim="v$.lastName.$model"
          type="text"
          class="input__element"
          autocomplete="family-name"
        />
        <div class="input__response">
          <ul>
            <li v-for="error of v$.lastName.$errors" :key="error.$uid">
              {{ error.$message }}
            </li>
          </ul>
        </div>
      </div>
    </label>

    <label class="field" :class="{ 'field--error': v$.email.$error }">
      <span class="field__label">Email Address</span>
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

    <label class="field" :class="{ 'field--error': v$.password.$error }">
      <span class="field__label">Password</span>
      <div class="input">
        <input
          v-model.trim="v$.password.$model"
          type="password"
          class="input__element"
          autocomplete="new-password"
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

    <label class="field">
      <input v-model="marketing" type="checkbox" />
      <span class="field__label">Accept marketting</span>
    </label>

    <div class="field">
      <button type="submit">Register</button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import createUserMutation from "@/graphql/mutations/CreateUser.gql";

export default {
  name: "RegisterPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      marketing: false,
    };
  },
  methods: {
    handleFormSubmit() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      this.$apollo.mutate({
        mutation: createUserMutation,
        variables: {
          input: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            acceptsMarketing: this.marketing,
          },
        },
      });
    },
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required },
    };
  },
};
</script>
