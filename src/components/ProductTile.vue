<template>
  <a :href="product.onlineStoreUrl" class="product">
    <div class="product__images">
      <carousel :wrap-around="true">
        <slide v-for="image in images" :key="image.id">
          <img :src="image?.src" :alt="image?.altText" class="product__image" />
        </slide>

        <template #addons="{ currentSlide, slidesCount }">
          <div class="carousel__pagination">
            {{ currentSlide + 1 }} of {{ slidesCount }}
          </div>
        </template>
      </carousel>
    </div>
    <div class="product__info">
      <h2 class="product__title">{{ product.title }}</h2>
      <button class="add-to-bag__button" @click="handleAddToBag">
        Add to bag | {{ $filters.toCurrency(price.amount, price.currencyCode) }}
      </button>
    </div>
  </a>
  <AddToBag v-model:open="openAddToBag" :product="product" />
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import AddToBag from "@/components/add-to-bag/AddToBag.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";

export default {
  name: "ProductTile",
  components: {
    AddToBag,
    Carousel,
    Slide,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openAddToBag: false,
    };
  },
  computed: {
    images() {
      return unwrapNodes(this.product.images.edges);
    },
    price() {
      return this.product.priceRange.minVariantPrice;
    },
  },
  methods: {
    handleAddToBag() {
      this.openAddToBag = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.product {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product__info {
  padding: 10px 10px 40px 10px;
}

.product__images {
  flex: 1 0 auto;
}

.product__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product__title {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: normal;
}

.add-to-bag__button {
  font-size: 9px;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  text-transform: uppercase;
  font-weight: 600;
}

::v-deep() {
  .carousel,
  .carousel__viewport,
  .carousel__track {
    height: 100%;
  }
}

.carousel__pagination {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  color: $color-white;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
