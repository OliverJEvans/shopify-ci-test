<template>
  <button @click="$emit('back')">Back to account</button>
  <h1>Edit</h1>
</template>

<script>
export default {
  emits: ["back"],
};
</script>
