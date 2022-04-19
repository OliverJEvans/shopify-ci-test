<template>
  <div v-if="hasProductRecommendations" class="product-recommendations">
    <div class="product-recommendations__header container">
      <h2 class="product-recommendations__title">More For You</h2>
      <a class="product-recommendations__link" href="#">Shop All</a>
    </div>
    <div class="photos">
      <PhotoTile
        v-for="product in productRecommendations"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import productRecommendations from "@/graphql/queries/ProductRecommendations.gql";
import PhotoTile from "@/components/PhotoTile.vue";
export default {
  components: {
    PhotoTile,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasProductRecommendations() {
      return !!this.productRecommendations?.length;
    },
  },
  apollo: {
    productRecommendations: {
      query: productRecommendations,
      variables() {
        return {
          productId: this.productId,
        };
      },
      result({ data }) {
        console.log(data);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.product-recommendations {
  margin-bottom: 60px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  &__title {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: normal;

    @include respond-above(md) {
      font-size: 30px;
    }
  }

  &__link {
    font-size: 8px;
    text-decoration: none;
    text-transform: uppercase;
    color: $color-dark;
    font-weight: 600;

    @include respond-above(md) {
      font-size: 10px;
    }
  }
}

.photos {
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;

  & > * {
    flex: 1 0 87.5%;
    margin-right: 2px;

    @include respond-above(md) {
      flex: 1 0 40%;
    }
  }
}
</style>
