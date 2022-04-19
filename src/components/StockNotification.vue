<template>
  <SlideUp v-model:open="isOpen" heading="Stock Notification">
    <template #content>
      <form v-if="product" ref="form" class="form">
        <label class="field" :class="{ 'field--error': v$.email.$error }">
          <span class="field__label">
            Notify when the "{{ product.title }}" comes back in stock in a Small
            size.
          </span>
          <div class="input">
            <input
              v-model.trim="email"
              type="email"
              class="input__element"
              autocomplete="email"
              placeholder="E-mail address"
            />
            <div v-if="v$.email.$dirty" class="input__response">
              <ul>
                <li v-for="error of v$.email.$errors" :key="error.$uid">
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
        </label>

        <label class="field field--checkbox">
          <span class="field__label">Recieve offers and promotions</span>
          <div class="input input--checkbox">
            <input
              v-model="marketing"
              type="checkbox"
              class="input__element input__element--checkbox"
            />
            <span class="input__checkbox"></span>
          </div>
        </label>
      </form>
    </template>
    <template #footer>
      <Button type="button" full-width @click="handleFormSubmit">
        Notify me when back in stock
      </Button>
    </template>
  </SlideUp>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:open"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      open: false,
      email: "",
      marketing: false,
    };
  },
  computed: {
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
    async handleFormSubmit() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }

      const productId = window.atob(this.product.id).split("Product/")[1];
      const variantId = window
        .atob(this.variant.id)
        .split("ProductVariant/")[1];

      const formData = new FormData();

      formData.append("a", "KKdVHx");
      formData.append("email", this.email);
      formData.append("variant", variantId);
      formData.append("product", productId);
      formData.append("platform", "shopify");
      formData.append("subscribe_for_newsletter", this.marketing);

      if (this.marketing) {
        formData.append("g", "WZEcwA");
      }

      const response = await fetch(
        "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
        {
          method: "post",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        this.isOpen = false;
      }
    },
  },
  validations() {
    return {
      email: { required, email },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.field {
  margin-bottom: 20px;
  display: block;

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    display: block;
    font-size: 11px;
    margin-bottom: 10px;
  }
}

.input {
  display: block;
  font-size: 11px;
  font-weight: 300;
  margin-bottom: 10px;

  &__element {
    display: block;
    font-size: 13px;
    font-family: $body-font-family;
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid $color-dark;

    &::placeholder {
      opacity: 0.3;
    }
  }
}

.field--checkbox {
  display: flex;
  gap: 5px;
  align-items: center;

  .input {
    order: 0;
    flex: 0 1 auto;

    &--checkbox {
      margin-bottom: 0;
    }

    &__element--checkbox {
      @extend .u__visually-hidden;
      border: none;

      &:checked + .input__checkbox::after {
        content: "✔";
        position: absolute;
        width: 100%;
        text-align: center;
      }
    }
  }

  .field__label {
    margin-bottom: 0;
    order: 1;
  }
}

.input__checkbox {
  border: 1px solid $color-dark;
  border-radius: 2px;
  height: 16px;
  width: 16px;
  display: block;
  position: relative;
}
</style>
