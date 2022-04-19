<template>
  <div class="stepper">
    <button
      class="stepper__button"
      :disabled="disableDecrement"
      @click="decreaseCount"
    >
      <span>-</span>
    </button>
    <span>{{ count }}</span>
    <button
      class="stepper__button"
      :disabled="disableIncrement"
      @click="increaseCount"
    >
      <span>+</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    initialCount: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  emits: ["change"],
  data() {
    return {
      count: this.initialCount,
    };
  },
  computed: {
    disableIncrement() {
      return !(this.max && this.count < this.max);
    },
    disableDecrement() {
      return !(this.count > 0);
    },
  },
  watch: {
    count() {
      this.$emit("change", this.count);
    },
  },
  methods: {
    decreaseCount() {
      if (!this.disableDecrement) {
        this.count--;
      }
    },
    increaseCount() {
      if (!this.disableIncrement) {
        this.count++;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.stepper {
  display: flex;
  align-items: center;

  &__button {
    height: 15px;
    width: 15px;
    text-align: center;
    border-radius: 100%;
    background: $color-light;
    outline: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>
