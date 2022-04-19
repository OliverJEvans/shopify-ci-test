<template>
  <component :is="bnplprovider" v-if="price" :price="price" />
</template>

<script>
import Klarna from "@/components/product-display/bnpl-providers/Klarna.vue";
import Clearpay from "@/components/product-display/bnpl-providers/Clearpay.vue";

export default {
  component: {
    Klarna,
    Clearpay,
  },
  props: {
    price: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bnplprovider: Clearpay,
    };
  },
};
</script>
