<template>
  <div class="instagram-tile">
    <a :href="tileLinkUrl">
      <img :src="tileImageUrl" class="instagram-tile__image" />
      <div class="instagram-tile__text">Shop the look</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "InstagramTile",
  props: {
    tileImageUrl: {
      type: String,
      required: true,
    },
    tileLinkUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";
.instagram-tile {
  position: relative;
}

.instagram-tile__image {
  max-width: 100%;
  width: 100%;
}

.instagram-tile__text {
  bottom: 10px;
  color: rgb(255, 255, 255);
  font-size: 9px;
  font-weight: 600;
  left: 10px;
  letter-spacing: 0.49px;
  line-height: 12px;
  position: absolute;
  text-transform: uppercase;

  @include respond-above(md) {
    bottom: 12px;
    left: 10px;
    line-height: 14px;
  }
}
</style>
