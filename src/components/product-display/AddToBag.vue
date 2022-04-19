<template>
  <Button
    v-if="availableForSale"
    type="button"
    :class="classes"
    full-width
    @click="addToCart"
  >
    Add to bag
    <template v-if="lowStock">(low stock)</template>
    <template v-if="price">
      | {{ $filters.toCurrency(price.amount, price.currencyCode) }}</template
    >
  </Button>
  <span v-else>Out of stock</span>
</template>

<script>
import addToCartMutation from "@/graphql/mutations/AddToCart.gql";
import Button from "@/components/Button.vue";

export default {
  name: "AddToBag",
  components: {
    Button,
  },
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    variantId: {
      type: String,
      required: true,
    },
    availableForSale: {
      type: Boolean,
      required: true,
    },
    lowStock: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      cartId: null,
    };
  },
  computed: {
    classes() {
      return {
        "add-to-bad--transparent": this.transparent,
      };
    },
  },
  mounted() {
    this.getCartId();
  },
  methods: {
    getCartId() {
      this.cartId = localStorage.getItem("shopifyCartId");
    },
    addToCart() {
      try {
        this.$apollo.mutate({
          mutation: addToCartMutation,
          variables: {
            cartId: this.cartId,
            lines: [
              {
                quantity: 1,
                merchandiseId: this.variantId,
              },
            ],
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
