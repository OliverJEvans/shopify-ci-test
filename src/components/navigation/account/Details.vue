<template>
  <button @click="$emit('back')">Back to account</button>
  <h1>Details</h1>
</template>

<script>
export default {
  emits: ["back"],
};
</script>
