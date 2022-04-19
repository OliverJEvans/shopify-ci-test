<template>
  <SlideUp v-model:open="isOpen" heading="Add to bag">
    <template #content>
      <ul>
        <li v-for="variant in variants" :key="variant.id">
          <button
            class="variant-button"
            :class="{ 'variant-button--disabled': !variant.availableForSale }"
            @click="$emit('selectedVariant', variant)"
          >
            <div class="variant-label">{{ variant.title }}</div>
            <div class="quantity">
              {{ quantityStatus(variant.quantityAvailable) }}
            </div>
          </button>
        </li>
      </ul>
    </template>
    <template #footer>
      <Button full-width theme="outline">Need help with your size?</Button>
    </template>
  </SlideUp>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    variants: {
      type: Array,
      required: true,
    },
    originalVariant: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:open", "selectedVariant"],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapState("cart", ["cartData"]),
    isOpen: {
      get() {
        return this.open;
      },
      set(value) {
        return this.$emit("update:open", value);
      },
    },
  },
  methods: {
    ...mapActions("cart", ["setCartData"]),
    quantityStatus(quantity) {
      if (quantity === 0) {
        return "Notify me";
      }
      if (quantity <= 15 && quantity > 5) {
        return "Low stock";
      }
      if (quantity <= 5) {
        return (
          quantity + " " + this.$filters.pluralize("item", quantity) + " left"
        );
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.variant-button {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: none;
  outline: none;
  border: none;
  padding: 10px 0;

  &--disabled {
    .variant-label {
      color: rgba($color-dark, 0.2);
    }
  }
}

.variant-label {
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 600;
}

.quantity {
  font-size: 10px;
}
</style>
