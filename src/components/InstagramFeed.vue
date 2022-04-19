<template>
  <div class="instagram-feed">
    <div class="subheading">{{ subheading }}</div>
    <h3 class="heading">{{ heading }}</h3>
    <carousel :settings="settings" :breakpoints="breakpoints">
      <slide v-for="tile in tiles" :key="tile.imageUrl">
        <InstagramTile
          :tile-image-url="tile.imageUrl"
          :tile-link-url="tile.linkUrl"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import InstagramTile from "@/components/InstagramTile";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
export default {
  name: "InstagramFeed",
  components: {
    InstagramTile,
    Carousel,
    Slide,
  },
  props: {
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      required: true,
    },
    tiles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      settings: {
        itemsToShow: 1.5,
        snapAlign: "center",
        wrapAround: true,
      },
      breakpoints: {
        992: {
          itemsToShow: 4,
          snapAlign: "left",
          wrapAround: true,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.instagram-feed {
  padding: 60px 0 0 0;

  @include respond-above(md) {
    padding: 80px 0 0 0;
  }
}

.heading {
  font-size: 24px;
  font-weight: normal;
  margin: 0 auto 10px;
  text-align: center;
  text-transform: uppercase;
  width: 242px;

  @include respond-above(md) {
    font-size: 50px;
    width: auto;
  }
}

.subheading {
  font-size: 9px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0.49px;
  margin: 0 0 5px;
  text-align: center;
  text-transform: uppercase;

  @include respond-above(md) {
    font-size: 10px;
    line-height: 14px;
  }
}

::v-deep() {
  .carousel__slide {
    padding: 0 5px;

    @include respond-above(md) {
      width: 330px;
    }
  }
}
</style>
