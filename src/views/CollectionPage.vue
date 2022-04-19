<template>
  <div class="collection__header">
    <h1 class="collection__title">{{ collection.title }}</h1>
    <p class="collection__description">{{ collection.description }}</p>
  </div>

  <div class="collection__bar">
    <product-types :types="types" @change="handleTypeChange" />

    <div class="toolbar__wrapper">
      <div class="toolbar">
        <div class="toolbar__item">
          <button class="toolbar__button" @click="setIsFiltersOpen(true)">
            Filter
          </button>
        </div>
        <div class="toolbar__item">
          <label class="radio-text-toggle">
            <input
              v-model="photoMode"
              type="radio"
              value="model"
              name="photoMode"
            />
            <span>Model</span>
          </label>
          <label class="radio-text-toggle">
            <input
              v-model="photoMode"
              type="radio"
              value="product"
              name="photoMode"
            />
            <span>Product</span>
          </label>
        </div>
        <div class="toolbar__item">
          <label class="radio-text-toggle">
            <input v-model="layout" type="radio" value="list" name="layout" />
            <span>List</span>
          </label>
          <label class="radio-text-toggle">
            <input v-model="layout" type="radio" value="grid" name="layout" />
            <span>Grid</span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <product-grid :products="products" :layout="layout" />

  <ScrollTrigger
    v-if="products.length > 0"
    @intersected="fetchMore"
  ></ScrollTrigger>

  <filters
    :available-filters="collection.products.filters"
    @filterChange="handleFilterChange"
    @sortChange="handleSortChange"
  />
</template>

<script>
import ProductGrid from "@/components/collection/ProductGrid.vue";
import ProductTypes from "@/components/collection/ProductTypes.vue";
import Filters from "@/components/collection/Filters.vue";
import ScrollTrigger from "@/components/ScrollTrigger.vue";
import collectionQuery from "@/graphql/queries/Collection.gql";
import { unwrapNodes } from "@/helpers/graphql";
import { PER_PAGE, RelayConnection } from "@/helpers/pagination";
import merge from "lodash/merge";
import { mapActions, mapGetters } from "vuex";
import createCartMutation from "@/graphql/mutations/CreateCart.gql";

export default {
  name: "CollectionPage",
  components: {
    Filters,
    ProductGrid,
    ProductTypes,
    ScrollTrigger,
  },
  props: {
    collectionHandle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      collection: {
        products: new RelayConnection(),
      },
      filters: [],
      photoMode: "model",
      openFilters: false,
    };
  },
  computed: {
    ...mapGetters("app", ["collectionPageLayout"]),
    layout: {
      get() {
        return this.collectionPageLayout;
      },
      set(value) {
        this.setUserPreferences({ key: "collectionPageLayout", value });
      },
    },
    products() {
      return unwrapNodes(this.collection.products?.edges);
    },
    types() {
      return this.collection.products?.filters?.find(
        (filter) => filter.id === "filter.p.product_type"
      ).values;
    },
  },
  mounted() {
    this.createCart();
  },
  methods: {
    ...mapActions("app", ["setIsFiltersOpen", "setUserPreferences"]),
    unwrapNodes,
    async fetchMore() {
      if (!this.collection.products.pageInfo.hasNextPage) {
        return;
      }

      const lastEdge = this.collection.products.edges.at(-1);
      const paginationCursor = lastEdge.cursor;

      try {
        await this.$apollo.queries.collection.fetchMore({
          variables: {
            after: paginationCursor,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleFilterChange(filters) {
      this.openFilters = false;
      this.filters = merge(this.filters, filters);

      this.$apollo.queries.collection.refetch({
        product_filters: this.filters,
      });
    },
    handleTypeChange(type) {
      this.filters = merge(this.filters, [type]);

      this.$apollo.queries.collection.refetch({
        product_filters: this.filters,
      });
    },
    handleSortChange(sort) {
      this.$apollo.queries.collection.refetch({
        sort: sort.key,
        reverse: sort.reverse,
      });
    },
    async createCart() {
      const hasExistingCartId = !!localStorage.getItem("shopifyCartId");
      if (hasExistingCartId) {
        return;
      }

      try {
        const { data } = await this.$apollo.mutate({
          mutation: createCartMutation,
        });

        localStorage.setItem("shopifyCartId", data.cartCreate.cart.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  apollo: {
    collection: {
      query: collectionQuery,
      variables() {
        return {
          collection: this.collectionHandle,
          first: PER_PAGE,
        };
      },
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/helpers";
@import "@/assets/css/base";

.collection__header {
  background-color: $color-light;
  padding: 60px 20px;

  @include respond-above(md) {
    padding: 80px 40px;
  }
}

.collection__title {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: normal;

  @include respond-above(md) {
    font-size: 30px;
  }
}

.collection__description {
  margin-top: 10px;
  font-size: 14px;
  font-family: $heading-font-family;

  @include respond-above(md) {
    font-size: 18px;
  }
}

.toolbar {
  background: $color-white;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  @include respond-above(md) {
    justify-content: end;
    padding-right: 10px;
  }

  &__wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;

    @include respond-above(md) {
      position: static;
      flex: 0 1 auto;
    }
  }

  &__button {
    text-transform: uppercase;
    padding: 20px;
    font-size: 9px;
    background: none;
    outline: none;
    border: none;
  }

  label {
    display: inline-block;
    padding: 20px 10px;
    font-size: 9px;

    input[type="radio"] {
      position: fixed;
      opacity: 0;
      pointer-events: none;

      &:checked + span {
        font-weight: bold;
      }
    }
  }
}

.radio-text-toggle {
  text-transform: uppercase;

  & + .radio-text-toggle {
    position: relative;
    &::before {
      position: absolute;
      content: "|";
      left: 0;
    }
  }
}

.collection__bar {
  display: flex;
  justify-content: space-between;
}
</style>
