<template>
  <div v-if="product">
    <div class="product">
      <ul class="images">
        <li
          v-for="image in unwrapNodes(product.images?.edges)"
          :key="image.id"
          class="image__wrapper"
        >
          <img :src="image.src" :alt="image.altText" class="image__element" />
        </li>
      </ul>

      <div class="content">
        <div class="product__header">
          <h1 class="product__title">{{ product.title }}</h1>
          <p class="product__description">{{ product.description }}</p>

          <ProductOptions
            :options="product.options"
            @optionsChange="handleOptionsChange"
          />

          <AddToBag
            :variant-id="selectedVariant?.id"
            :price="selectedVariant?.priceV2"
            :available-for-sale="selectedVariant.availableForSale"
            :low-stock="variantHasLowStock"
          />

          <div class="u__background--white product__payment">
            <BNPLInformation :price="selectedVariant?.priceV2" />
            <DeliveryInformation v-if="false" />
            You'll collect <b>{{ points }}</b> style points via Friends With
            Benefits
          </div>
        </div>

        <div class="u__background--white product__details">
          <Tabs class="product-details-tabs">
            <Tab name="details">
              <div class="wysiwyg" v-html="product.descriptionHtml"></div>
            </Tab>
            <Tab name="Sizing">
              <p>
                Model is 5'6" and is wearing a size extra small. View the
                <a href="#">Size Guide</a>
              </p>
            </Tab>
            <Tab name="Shipping">
              <div class="wysiwyg">
                <p>
                  <b>
                    Please allow 2/3 extra days for shipping during the sale
                    period
                  </b>
                </p>

                <p>
                  <b>Free UK Next Day Delivery</b>

                  Order now to receive..... Orders are only dispatched on
                  weekdays. Order before 2pm Mon - Thur for next day delivery.
                </p>

                <p>
                  <b>International Delivery</b> - Free international shipping
                  for orders over {deliveryText}. Orders outside the UK will
                  arrive in 2/3 working days for major cities. Please note more
                  remote areas can be a few days longer.{" "}
                  <a href="/pages/delivery">Find out more</a>
                </p>
              </div>
            </Tab>
            <Tab name="Returns">
              <div class="wysiwyg">
                <p>
                  <b>
                    Sale returns will be accepted for refund only, exchanges
                    will not be permitted on sale items
                  </b>
                </p>
                <p>
                  If you’re not perfectly satisfied, you may return items using
                  a prepaid label provided by us or a courier of your choice.
                  <a href="#">Find out more</a>
                </p>
              </div>
            </Tab>
            <Tab name="Fabric &amp; Care">Test</Tab>
          </Tabs>
        </div>
      </div>
    </div>

    <div>INSTAGRAM COMPONENT</div>
    <ProductRecommendations :product-id="product.id" />
    <Newsletter />
  </div>
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import productQuery from "@/graphql/queries/Product.gql";
import createCartMutation from "@/graphql/mutations/CreateCart.gql";
import AddToBag from "@/components/product-display/AddToBag.vue";
import ProductOptions from "@/components/product-display/ProductOptions.vue";
import BNPLInformation from "@/components/product-display/BNPLInformation.vue";
import DeliveryInformation from "@/components/product-display/DeliveryInformation.vue";
import ProductRecommendations from "@/components/product-display/ProductRecommendations.vue";
import Newsletter from "@/components/Newsletter.vue";
import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";

export default {
  name: "ProductPage",
  components: {
    AddToBag,
    ProductOptions,
    BNPLInformation,
    DeliveryInformation,
    ProductRecommendations,
    Tabs,
    Tab,
    Newsletter,
  },
  props: {
    productHandle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
      selectedVariant: null,
      selectedOptions: [],
      variantBySelectedOptions: null,
    };
  },
  computed: {
    variantHasLowStock() {
      return (
        this.selectedVariant.quantityAvailable > 0 &&
        this.selectedVariant.quantityAvailable < 10
      );
    },
    points() {
      return Math.round(parseInt(this.selectedVariant.priceV2.amount));
    },
  },
  mounted() {
    this.createCart();
  },
  methods: {
    unwrapNodes,
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
    handleOptionsChange(selectedOptions) {
      this.selectedOptions = selectedOptions.map(({ name, value }) => ({
        name,
        value,
      }));
    },
  },
  apollo: {
    product: {
      query: productQuery,
      variables() {
        return {
          product: this.productHandle,
          selectedOptions: this.selectedOptions,
        };
      },
      result({ data }) {
        const variantByOptions = data.product.variantBySelectedOptions;
        if (variantByOptions) {
          this.selectedVariant = data?.product.variantBySelectedOptions;
        } else {
          this.selectedVariant = unwrapNodes(data?.product.variants?.edges)[0];
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.product {
  @include respond-above(md) {
    display: grid;
    grid-template-columns: 3fr 2fr;
  }

  &__header {
    background-color: $color-light;
    padding: 30px 20px 30px;

    @include respond-above(md) {
      padding: 80px;
    }
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: normal;
  }

  &__description {
    font-size: 14px;
    font-family: $heading-font-family;
  }

  &__details {
    padding: 20px 20px 30px;
    margin-bottom: 30px;
    padding-top: 20px;
    padding-bottom: 30px;

    @include respond-above(md) {
      padding: 80px;
    }
  }

  &__payment {
    margin-top: 20px;
    font-size: 11px;
    padding: 20px;

    ::v-deep(p) {
      margin-bottom: 14px;
    }
  }
}

.content {
  @include respond-above(md) {
    position: sticky;
    top: 0;
    align-self: start;
  }
}

.images {
  overflow: auto;
  white-space: nowrap;

  @include respond-above(md) {
    overflow: visible;
    white-space: normal;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .image__wrapper {
    display: inline-block;
    width: 87.5%;
    margin-right: 2px;

    @include respond-above(md) {
      display: block;
      width: 100%;
      margin-right: 0;
    }

    &:nth-child(3n + 1) {
      grid-column: 1 / span 2;
    }
  }

  .image__element {
    width: 100%;
    height: auto;
    display: block;
  }
}

.wysiwyg ::v-deep() {
  font-size: 11px;

  p {
    margin-bottom: 15px;
  }

  ul,
  ol {
    list-style: initial;
    margin-bottom: 15px;

    li {
      margin-left: 15px;
    }
  }

  *:last-child {
    margin-bottom: 0;
  }
}

.product-details-tabs {
  ::v-deep() {
    .tabs-component-tabs {
      overflow: auto;
      white-space: nowrap;
    }

    .tabs-component-tab {
      display: inline-block;

      &:first-child .tabs-component-tab-a {
        padding-left: 0;
      }
    }

    .tabs-component-tab-a {
      font-size: 9px;
      background: none;
      outline: none;
      border: none;
      text-transform: uppercase;
      padding: 10px 14px;
      opacity: 0.2;
      font-weight: 600;

      &.is-active {
        opacity: 1;
      }
    }

    .tabs-component-panels {
      font-size: 11px;
      margin-top: 10px;
    }
  }
}
</style>
