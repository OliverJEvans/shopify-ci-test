<template>
  <div>
    <h1>Cart Page</h1>

    <ul>
      <li v-for="line in lines" :key="line.id">
        <h2>{{ line.merchandise.product.title }}</h2>
        <p>QTY: {{ line.quantity }}</p>
        <p>Total Amount: {{ line.estimatedCost.totalAmount.amount }}</p>
        <ul>
          <li
            v-for="(option, index) in line.merchandise.selectedOptions"
            :key="index"
          >
            {{ option.name }}: {{ option.value }}
          </li>
        </ul>
        <button type="button" @click.prevent="removeCartItem(line.id)">
          Remove
        </button>
      </li>
    </ul>
  </div>

  <div>
    <h2>Cart Summary</h2>
    <p>{{ cart.estimatedCost?.totalAmount?.amount }}</p>
    <a :href="cart.checkoutUrl">Checkout</a>
  </div>
</template>

<script>
import cartQuery from "@/graphql/queries/Cart.gql";
import removeFromCartMutation from "@/graphql/mutations/RemoveFromCart.gql";
import { unwrapNodes } from "@/helpers/graphql";

export default {
  name: "CartPage",
  data() {
    return {
      cartId: null,
      cart: [],
    };
  },
  computed: {
    lines() {
      return unwrapNodes(this.cart.lines?.edges);
    },
  },
  mounted() {
    this.getCartId();
  },
  methods: {
    unwrapNodes,
    getCartId() {
      this.cartId = localStorage.getItem("shopifyCartId");
    },
    async removeCartItem(value) {
      try {
        await this.$apollo.mutate({
          mutation: removeFromCartMutation,
          variables: {
            cartId: this.cartId,
            lineIds: [value],
          },
        });
      } catch (error) {
        console.log(error);
      }
      this.$apollo.queries.cart.refetch();
    },
  },
  apollo: {
    cart: {
      query: cartQuery,
      variables() {
        return {
          id: this.cartId,
        };
      },
    },
  },
};
</script>
