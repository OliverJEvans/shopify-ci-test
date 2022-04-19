<template>
  <div class="collection-hero-group">
    <div v-for="collection in collections">
      <CollectionHero :collection="collection" :key="collection.heading" />
    </div>
  </div>
</template>

<script>
import CollectionHero from "@/components/CollectionHero.vue";
export default {
  name: "CollectionHeroGroup",
  components: {
    CollectionHero,
  },
  props: {
    collections: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.collection-hero-group {
  @include respond-above(md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2px;
  }
}
</style>
