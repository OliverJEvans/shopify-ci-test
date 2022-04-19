<template>
  <div class="price-filter">
    <div class="values">
      <div>{{ priceRange[0] }}</div>
      <div>{{ priceRange[1] }}</div>
    </div>
    <vue-slider
      v-model="priceRange"
      :min="min"
      :max="max"
      tooltip="none"
      @change="handlePriceChange"
    />
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "PriceFilter",
  components: {
    VueSlider,
  },
  props: {
    values: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["change"],
  data() {
    return {
      min: JSON.parse(this.values[0].input).price.min,
      max: JSON.parse(this.values[0].input).price.max,
      priceRange: [0, JSON.parse(this.values[0].input).price.max],
      price: {},
    };
  },
  watch: {
    values(val) {
      this.min = JSON.parse(val[0].input).price.min;
      this.max = JSON.parse(val[0].input).price.max;
    },
  },
  methods: {
    handlePriceChange() {
      this.price.min = this.priceRange[0];
      this.price.max = this.priceRange[1];
      this.$emit("change", { price: this.price });
    },
  },
};
</script>

<style lang="scss" scoped>
.values {
  display: flex;
  justify-content: space-between;
}
</style>
