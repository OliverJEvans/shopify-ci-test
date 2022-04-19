<template>
  <form @submit.prevent="handleRecoverySubmit">
    <label>
      <span>Email</span>
      <input v-model="email" type="email" />
    </label>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import accountRecoveryMutation from "@/graphql/mutations/AccountRecovery.gql";

export default {
  name: "AccountRecovery",
  data() {
    return {
      email: null,
    };
  },
  methods: {
    async handleRecoverySubmit() {
      await this.$apollo.mutate({
        mutation: accountRecoveryMutation,
        variables: {
          email: this.email,
        },
      });
    },
  },
};
</script>
