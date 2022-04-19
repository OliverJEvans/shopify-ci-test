<template>
  <button
    v-if="tag === 'button'"
    :class="classes"
    class="button"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
  <a
    v-if="tag === 'a'"
    :class="classes"
    class="button"
    :type="type"
    :disabled="disabled"
    :href="href"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    theme: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "outline"].includes(value);
      },
    },
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "submit"].includes(value);
      },
    },
    tag: {
      type: String,
      default: "button",
      validator(value) {
        return ["a", "button"].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      },
    },
  },
  emits: ["click"],
  computed: {
    classes() {
      return {
        "button--small": this.size === "small",
        "button--large": this.size === "large",
        "button--full-width": this.fullWidth,
        "button--transparent": this.transparent,
        "button--secondary": this.theme === "secondary",
        "button--outline": this.theme === "outline",
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.button {
  background: $color-dark;
  padding: 14px;
  border-radius: 2px;
  outline: none;
  border: none;
  color: $color-white;
  text-transform: uppercase;
  font-size: 9px;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  &--small {
    padding: 10px;
  }

  &--secondary {
    background-color: rgba($color-dark, 0.3);
  }

  &--outline {
    background-color: $color-white;
    border: 1px solid $color-dark;
    color: $color-dark;
  }
}

.button--full-width {
  display: block;
  width: 100%;
}

.button--transparent {
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  color: $color-dark;
}
</style>
