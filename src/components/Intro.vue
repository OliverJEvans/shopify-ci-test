<template>
  <div>
    <h3 class="text">{{ text }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";
.text {
  color: $color-dark;
  font-size: 18px;
  font-weight: 300;
  padding: 30px 20px;
  @include respond-above(md) {
    font-size: 24px;
    max-width: 60%;
    padding: 40px;
  }
}
</style>
