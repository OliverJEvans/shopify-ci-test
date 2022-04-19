<template>
  <button
    :class="classes"
    class="icon-button"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <i :class="'icon-' + icon" />
    <slot />
  </button>
</template>

<script>
import ButtonComponent from "@/components/Button.vue";
export default {
  name: "IconButton",
  extends: ButtonComponent,
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-button {
  background: none;
  outline: none;
  border: none;
  padding: 15px;
  margin: 0 -15px;
  display: inline-block;
}
</style>
