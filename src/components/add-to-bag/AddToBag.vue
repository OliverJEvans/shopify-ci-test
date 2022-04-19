<template>
  <VariantsList
    v-model:open="openVariantList"
    :variants="variants"
    @selectedVariant="handleSelectedVariant"
  />
  <AddedToBag
    v-model:open="openAddedToBag"
    :product="product"
    :variant="selectedVariant"
    @editVariant="handleEditVariant"
  />
  <StockNotification
    v-model:open="openStockNotification"
    :product="product"
    :variant="selectedVariant"
  />
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import { mapActions, mapState } from "vuex";
import isEmpty from "lodash-es/isEmpty";
import VariantsList from "@/components/add-to-bag/VariantsList.vue";
import AddedToBag from "@/components/add-to-bag/AddedToBag.vue";
import StockNotification from "@/components/StockNotification.vue";

export default {
  components: {
    VariantsList,
    AddedToBag,
    StockNotification,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:open"],
  data() {
    return {
      openVariantList: false,
      openAddedToBag: false,
      openStockNotification: false,
      variantId: null,
      originalVariant: {},
    };
  },
  computed: {
    ...mapState("cart", ["cartData"]),
    openProperties() {
      const { openVariantList, openAddedToBag, openStockNotification } = this;
      return {
        openVariantList,
        openAddedToBag,
        openStockNotification,
      };
    },
    selectedVariant() {
      return (
        this.variants.find((variant) => variant.id === this.variantId) || {}
      );
    },
    variants() {
      const variants = unwrapNodes(this.product.variants.edges) || [];
      return variants || null;
    },
  },
  watch: {
    openProperties: {
      handler: function (val) {
        const areAllClosed = Object.values(val).every(
          (value) => value === false
        );

        if (areAllClosed) {
          this.$emit("update:open", false);
        }
      },
      deep: true,
    },
    open(newVal, oldVal) {
      if (oldVal === false && newVal === true) {
        //hacky way of seeing if the open prop was changed from false to true
        if (this.variants.length > 1) {
          this.openVariantList = true;
        }
      }
    },
  },
  methods: {
    ...mapActions("cart", ["setCartData", "addCartItem", "removeCartItem"]),
    async handleSelectedVariant({ id, quantityAvailable }) {
      this.variantId = id;

      if (quantityAvailable === 0) {
        this.handleNotifyMe(id);
        return;
      }

      await this.addToBag(id);
    },
    async addToBag(id) {
      let quantity = 1;

      if (!isEmpty(this.originalVariant)) {
        const lines = unwrapNodes(this.cartData.lines.edges);

        const cartLine = lines.find((line) => {
          return line.merchandise.id === this.originalVariant.id;
        });

        await this.removeCartItem(cartLine.id);
        quantity = this.originalVariant.quantity;
      }

      try {
        await this.addCartItem({ id, quantity });

        this.openVariantList = false;
        this.openAddedToBag = true;
        this.originalVariant = {};
      } catch (error) {
        console.log(error);
      }
    },
    handleAddedToBag(variantId) {
      this.variantId = variantId;
      this.originalVariant = {};
      this.openAddToBag = false;
      this.openAddedToBag = true;
      this.openStockNotification = false;
    },
    handleNotifyMe(variantId) {
      this.variantId = variantId;
      this.openVariantList = false;
      this.openNotifyMe = false;
      this.openStockNotification = true;
    },
    handleEditVariant(originalVariant) {
      this.openVariantList = true;
      this.openAddedToBag = false;
      this.originalVariant = originalVariant;
    },
  },
};
</script>
