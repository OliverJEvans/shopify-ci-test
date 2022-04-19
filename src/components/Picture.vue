<template>
  <picture>
    <source
      :srcset="images.largeMedia"
      media="(min-width: 1000px)"
      class="image"
    />
    <source
      :srcset="images.mediumMedia"
      media="(min-width: 600px)"
      class="image"
    />
    <img :src="images.smallMedia" :alt="altTag" class="image" />
  </picture>
</template>

<script>
export default {
  name: "Picture",
  props: {
    images: {
      type: Object,
      required: true,
    },
    altTag: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
  width: 100%;

  img {
    display: block;
  }
}
</style>
