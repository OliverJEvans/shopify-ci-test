<template>
  <component :is="baseElement" class="tile" :href="tileLink">
    <img :src="tileImageUrl" class="tile__image" />
    <div class="tile__info">
      <h3 class="tile__heading">{{ tileTitle }}</h3>
      <Button
        v-if="product"
        :transparent="true"
        size="small"
        @click="handleAddToBag"
      >
        add to bag |
        {{ $filters.toCurrency(price.amount, price.currencyCode) }}
      </Button>
    </div>
    <AddToBag v-model:open="openAddToBag" :product="product" />
  </component>
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import Button from "@/components/Button.vue";
import AddToBag from "@/components/add-to-bag/AddToBag.vue";

export default {
  components: {
    Button,
    AddToBag,
  },
  props: {
    imageUrl: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    productId: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openAddToBag: false,
      openAddedToBag: false,
      variantId: null,
    };
  },
  computed: {
    baseElement() {
      return this.tileLink ? "a" : "div";
    },
    tileLink() {
      return this.product ? this.product.onlineStoreUrl : this.link;
    },
    tileTitle() {
      return this.product ? this.product.title : this.title;
    },
    tileImageUrl() {
      if (!this.product) {
        return this.imageUrl;
      }

      const images = unwrapNodes(this.product.images.edges);
      const firstImage = images ? images[0] : null;
      return firstImage.src;
    },
    price() {
      return this.product.priceRange.minVariantPrice;
    },
    variants() {
      const variants = unwrapNodes(this.product.variants.edges);
      return variants || null;
    },
    selectedVariant() {
      return this.variants.find((variant) => variant.id === this.variantId);
    },
  },
  methods: {
    handleAddToBag() {
      if (this.variants.length > 0) {
        this.openAddToBag = true;
      } else {
        console.error("Product has no variants", this.variants);
      }
      //Todo: Force add to bag if no variants
    },
    handleAddedToBag(variantId) {
      this.variantId = variantId;
      this.openAddToBag = false;
      this.openAddedToBag = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.tile {
  position: relative;

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    padding-bottom: 5px;
    color: $color-white;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__heading {
    font-size: 12px;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
  }

  ::v-deep(.button) {
    color: $color-white;
  }
}
</style>
