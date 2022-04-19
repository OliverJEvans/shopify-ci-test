<template>
  <ul>
    <li v-for="value in values" :key="value.id">
      <button
        class="list-filter-button"
        :class="{ 'list-filter-button--active': isFilterSelected(value) }"
        @click="handleListItemClick(value)"
      >
        {{ value.label }}
      </button>
    </li>
  </ul>
</template>

<script>
import isEqual from "lodash-es/isEqual";
export default {
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["change"],
  methods: {
    isFilterSelected(value) {
      const valueInput = JSON.parse(value.input);
      const filterKey = Object.keys(valueInput)[0];
      const selectedFilters = JSON.parse(JSON.stringify(this.filters))[0];

      if (
        selectedFilters &&
        Object.prototype.hasOwnProperty.call(selectedFilters, filterKey)
      ) {
        if (isEqual(valueInput[filterKey], selectedFilters[filterKey])) {
          return true;
        }
      }

      return false;
    },
    handleListItemClick(value) {
      this.$emit("change", JSON.parse(value.input));
    },
  },
};
</script>

<style lang="scss" scoped>
.list-filter-button {
  display: block;
  width: 100%;
  background: none;
  outline: none;
  border: none;
  text-align: left;
  font-size: 10px;
  padding: 10px 0;
  text-transform: capitalize;

  &--active {
    font-weight: 600;
  }
}
</style>
