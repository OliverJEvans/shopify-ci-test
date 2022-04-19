<template>
  <button @click="$emit('back')">Back to account</button>
  <h1>Your orders</h1>
  <ul>
    <li v-for="order in orders" :key="order.id">
      <pre>{{ order }}</pre>
    </li>
  </ul>
</template>

<script>
import OrdersQuery from "@/graphql/queries/Orders.gql";
import { mapState } from "vuex";
import { unwrapNodes } from "@/helpers/graphql";

export default {
  emits: ["back"],
  computed: {
    ...mapState("app", ["customerAccessToken"]),
    orders() {
      return this.customer && unwrapNodes(this.customer.orders?.edges);
    },
  },
  apollo: {
    customer: {
      query: OrdersQuery,
      skip() {
        return this.tokenValue === null;
      },
      variables() {
        return {
          customerAccessToken: this.customerAccessToken.value,
        };
      },
    },
  },
};
</script>
