<template>
  <div class="hero">
    <div class="copy">
      <h1 class="heading">{{ heading }}</h1>
      <a :href="linkUrl" class="link">{{ linkText }} </a>
    </div>
    <Picture :images="images" />
  </div>
</template>

<script>
import Picture from "@/components/Picture.vue";
export default {
  name: "Hero",
  components: {
    Picture,
  },
  props: {
    heading: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.hero {
  position: relative;
}

.copy {
  width: 100%;
  height: 100%;
  position: absolute;
  top: calc(50% - 30px);
  text-align: center;

  @include respond-above(md) {
    top: calc(50% - 120px);
  }
}

.heading {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: normal;
  margin: 0 10px 15px 10px;
  text-transform: uppercase;

  @include respond-above(md) {
    font-size: 90px;
  }
}

.link {
  color: rgb(255, 255, 255);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.49px;
  text-decoration: none;
  text-transform: uppercase;

  @include respond-above(md) {
    font-size: 10px;
  }
}
</style>
