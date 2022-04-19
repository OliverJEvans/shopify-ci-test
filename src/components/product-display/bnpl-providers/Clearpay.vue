<template>
  <p>
    {{ paymentMonths }} payments of
    {{ $filters.toCurrency(monthlyPayment, price.currencyCode) }} with Clearpay
  </p>
</template>

<script>
export default {
  props: {
    price: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      paymentMonths: 4,
    };
  },
  computed: {
    monthlyPayment() {
      return this.price.amount / this.paymentMonths;
    },
  },
};
</script>
