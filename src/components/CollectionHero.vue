<template>
  <div class="collection-hero">
    <div class="copy">
      <h1 class="heading">{{ collection.heading }}</h1>
    </div>
    <div class="links">
      <HeroLinks :links="collection.links" />
    </div>
    <Picture :images="collection.images" />
  </div>
</template>

<script>
import Picture from "@/components/Picture.vue";
import HeroLinks from "@/components/HeroLinks.vue";
export default {
  name: "CollectionHero",
  components: {
    Picture,
    HeroLinks,
  },
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.collection-hero {
  position: relative;
}

.copy {
  position: absolute;
  text-align: center;
  top: 20px;
  width: 100%;

  @include respond-above(md) {
    top: 60px;
  }
}

.heading {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: normal;
  margin: 0 10px;
  text-transform: uppercase;

  @include respond-above(md) {
    font-size: 60px;
  }
}

.links {
  bottom: 40px;
  position: absolute;
  text-align: center;
  width: 100%;

  @include respond-above(md) {
    bottom: 60px;
  }
}
</style>
