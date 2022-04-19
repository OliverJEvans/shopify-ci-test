<template>
  <div class="tile">
    <img :src="entry.image.url" class="tile__image" />
    <div class="tile__info">
      <div class="tile__category">{{ entry.tags[0] }}</div>
      <h3 class="tile__heading">{{ entry.title }}</h3>
      <h3 class="tile__text">{{ entry.excerpt }}</h3>
      <a :href="entry.onlineStoreUrl" class="tile__link">Read the story</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.tile {
  position: relative;

  &__info {
    bottom: 0;
    color: $color-white;
    left: 0;
    padding: 15px 15px 30px;
    position: absolute;
    right: 0;
    text-align: left;

    @include respond-above(md) {
      padding: 40px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__heading {
    font-size: 22px;
    font-weight: normal;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    white-space: normal;

    @include respond-above(md) {
      font-size: 40px;
    }
  }

  &__text {
    display: none;
    font-size: 18px;
    font-weight: 300;
    margin: 0 0 30px 0;
    white-space: normal;

    @include respond-above(md) {
      display: block;
    }
  }

  &__category {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.49px;
    text-transform: uppercase;
    margin: 0 0 5px 0;

    @include respond-above(md) {
      font-size: 10px;
    }
  }

  &__link {
    color: rgba(255, 255, 255);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.49px;
    text-decoration: none;
    text-transform: uppercase;

    @include respond-above(md) {
      font-size: 10px;
    }
  }
}
</style>
