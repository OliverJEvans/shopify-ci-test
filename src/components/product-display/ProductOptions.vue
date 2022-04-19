<template>
  <div v-for="option in filteredOptions" :key="option.id" class="option">
    <select class="option__dropdown">
      <option selected disabled>Select {{ option.name }}</option>
      <option
        v-for="value in option.values"
        :key="value"
        @change="handleOptionChange(option, value)"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ProductOptions",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["optionsChange"],
  data() {
    return {
      selectedOptions: [],
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) => option.values.length > 1);
    },
  },
  mounted() {
    this.options.forEach((option) => {
      if (option.values.length === 1) {
        this.selectedOptions.push({
          id: option.id,
          name: option.name,
          value: option.values[0],
        });
      }
    });
  },
  methods: {
    handleOptionChange(option, value) {
      const index = this.selectedOptions.findIndex(
        (selectedOption) => selectedOption.id === option.id
      );

      const optionObj = {
        id: option.id,
        name: option.name,
        value,
      };

      if (index === -1) {
        this.selectedOptions.push(optionObj);
      } else {
        this.selectedOptions[index] = optionObj;
      }

      this.$emit("optionsChange", this.selectedOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.option {
  margin-top: 20px;
  margin-bottom: 10px;

  &__dropdown {
    display: block;
    width: 100%;
    padding: 14px;
    border: 1px solid $color-dark;
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 9px;
  }
}
</style>
