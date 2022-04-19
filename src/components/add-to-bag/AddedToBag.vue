<template>
  <SlideUp v-model:open="isOpen" heading="Added to bag">
    <template #content>
      <p class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat porro
        in reiciendis quod, aperiam consequatur eum fuga ipsum animi cum maxime
        ut delectus! Ducimus ipsum maxime soluta dolorum omnis. Ex?
      </p>
      <div class="product">
        <div class="product__image-wrapper">
          <img
            :src="firstImage?.src"
            :alt="firstImage?.altText"
            class="product__image"
          />
        </div>
        <div class="product__details">
          <div class="product__title">{{ product.title }}</div>
          <div class="product__variant">
            <span class="variant-title">{{ variant.title }}</span>
            <button
              class="edit-variant-button"
              type="button"
              @click="handleEditVariant"
            >
              Edit size
            </button>
          </div>
          <div class="product__price">
            {{
              $filters.toCurrency(
                variant.priceV2.amount,
                variant.priceV2.currencyCode
              )
            }}
          </div>
          <div class="product__quantity">
            <NumberStepper
              :initial-count="quantity"
              :max="maxQuantity"
              @change="handleQuantityChange"
            />
            <button
              class="remove-product-button"
              type="button"
              @click="handleRemoveCartItem"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="button-group">
        <div class="cart-price">
          <span class="cart-price__heading">Subtotal</span>
          <span class="cart-price__value">
            {{ $filters.toCurrency(subtotal.amount, subtotal.currencyCode) }}
          </span>
        </div>
        <Button full-width theme="outline">Continue shopping</Button>
        <Button tag="a" :href="cartData.checkoutUrl" full-width>
          Go to bag
        </Button>
      </div>
    </template>
  </SlideUp>
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import { mapState, mapActions } from "vuex";
import NumberStepper from "@/components/NumberStepper";

export default {
  components: {
    NumberStepper,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    variant: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:open", "editVariant"],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapState("cart", ["cartData"]),
    firstImage() {
      const images = unwrapNodes(this.product.images.edges);
      return images ? images[0] : null;
    },
    isOpen: {
      get() {
        return this.open;
      },
      set(value) {
        return this.$emit("update:open", value);
      },
    },
    subtotal() {
      return this.cartData.estimatedCost.subtotalAmount;
    },
    cartLine() {
      const lines = unwrapNodes(this.cartData.lines.edges);

      return lines.find((line) => {
        return line.merchandise.id === this.variant.id;
      });
    },
    quantity() {
      return this.cartLine?.quantity;
    },
    maxQuantity() {
      return this.cartLine?.merchandise.quantityAvailable;
    },
  },
  methods: {
    ...mapActions("cart", ["removeCartItem", "updateCartItem"]),
    async handleRemoveCartItem() {
      try {
        await this.removeCartItem(this.cartLine.id);
        this.$emit("update:open", false);
      } catch (error) {
        console.log(error);
      }
    },
    async handleQuantityChange(val) {
      try {
        await this.updateCartItem({
          id: this.cartLine.id,
          quantity: val,
          merchandiseId: this.variant.id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleEditVariant() {
      this.$emit("editVariant", {
        id: this.variant.id,
        quantity: this.quantity,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.description {
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 20px;
  font-family: $heading-font-family;
}

.product {
  display: flex;
  font-size: 9px;
  font-weight: 600;

  &__image-wrapper {
    flex: 1 0 40%;
    margin-right: 20px;
  }

  &__image {
    max-width: 100%;
    height: auto;
  }

  &__details {
    flex: 1 0 calc(60% - 20px);
  }

  &__title {
    font-family: $heading-font-family;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  &__variant {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  &__price {
    margin-bottom: 12px;
  }

  &__quantity {
    display: flex;
    justify-content: space-between;
  }
}

.cart-price {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.edit-variant-button,
.remove-product-button {
  outline: none;
  background: none;
  border: none;
  font-size: 10px;
}

.button-group {
  ::v-deep(.button + .button) {
    margin-top: 10px;
  }
}
</style>
