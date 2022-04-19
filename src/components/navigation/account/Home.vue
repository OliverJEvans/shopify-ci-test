<template>
  <button @click="$emit('back')">Back to account</button>
  <h1>Welcome Back</h1>

  <button @click="attemptLogOut">Log Out</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  emits: ["back"],
  methods: {
    ...mapActions("app", ["attemptLogOut"]),
  },
};
</script>
