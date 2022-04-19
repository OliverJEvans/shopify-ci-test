<template>
  <ul class="products" :class="{ 'products--grid': layout === 'grid' }">
    <li v-for="product in products" :key="product.id">
      <ProductTile :product="product" />
    </li>
  </ul>
</template>

<script>
import ProductTile from "@/components/ProductTile.vue";
export default {
  name: "ProductGrid",
  components: {
    ProductTile,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      required: true,
      validator(value) {
        return ["list", "grid"].includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.products--grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;

  @include respond-above(md) {
    padding: 0 20px;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  ::v-deep(.product__info) {
    padding-bottom: 60px;
  }
}
</style>
