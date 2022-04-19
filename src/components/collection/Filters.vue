<template>
  <SlideUp v-model:open="openFilters" heading="Filters">
    <template #content>
      <div v-for="filter in availableFilters" :key="filter.id">
        <Accordion show-arrow class="filter-accordion">
          <template #header>
            {{ filter.label }} ({{ filter.values.length }})
          </template>
          <template #body>
            <component
              :is="getFilterName(filter.type)"
              :values="filter.values"
              :filters="filters"
              @change="handleFilterChange"
            />
          </template>
        </Accordion>
      </div>
      <!-- <SortFilter @change="handleSortChange" /> -->
    </template>
    <template #footer>
      <div class="button-group">
        <Button full-width @click="applyFilter">Apply filters</Button>
        <Button theme="secondary" full-width @click="handleResetClick"
          >Reset</Button
        >
      </div>
    </template>
  </SlideUp>
</template>

<script>
import camelCase from "lodash/camelCase";
import PriceFilter from "@/components/collection/filters/priceFilter.vue";
import ListFilter from "@/components/collection/filters/listFilter.vue";
import SortFilter from "@/components/collection/filters/sortFilter.vue";
import merge from "lodash/merge";
import Accordion from "@/components/Accordion.vue";
import SlideUp from "@/components/SlideUp.vue";
import { mapState, mapActions } from "vuex";

const filterTypes = {
  LIST: "list",
  PRICE_RANGE: "price",
};

export default {
  name: "Filters",
  components: {
    PriceFilter,
    ListFilter,
    SortFilter,
    Accordion,
    SlideUp,
  },
  props: {
    availableFilters: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["filterChange", "sortChange"],
  data() {
    return {
      filters: [],
    };
  },
  computed: {
    ...mapState("app", ["isFiltersOpen"]),
    openFilters: {
      get() {
        return this.isFiltersOpen;
      },
      set(value) {
        this.setIsFiltersOpen(value);
      },
    },
  },
  methods: {
    ...mapActions("app", ["setIsFiltersOpen"]),
    getFilterName(type) {
      const filterName = camelCase(filterTypes[type]);
      return filterName + "Filter";
    },
    handleFilterChange(input) {
      this.filters = merge(this.filters, [input]);
    },
    handleSortChange(sort) {
      this.$emit("sortChange", sort);
    },
    applyFilter() {
      this.setIsFiltersOpen(false);
      this.$emit("filterChange", this.filters);
    },
    handleResetClick() {
      this.setIsFiltersOpen(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.button-group {
  display: flex;
  gap: 10px;
}

::v-deep() {
  .filter-accordion.accordion--open {
    transition-timing-function: ease-out;
    background-color: $color-light;
    padding-bottom: 10px;
    margin-bottom: 20px;

    .accordion__header {
      transition-timing-function: ease-out;
      padding-top: 20px;
    }
  }
}

.filter-accordion {
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 0.3s;
  transition-timing-function: ease-in;

  ::v-deep() {
    .accordion__header {
      transition: padding-top 0.3s;
      transition-timing-function: ease-in;
      align-items: center;
      font-family: $body-font-family;
      text-transform: uppercase;
      width: 100%;
      font-size: 9px;
      background: none;
      outline: none;
      border: none;
      padding: 8px 0;
      font-weight: 600;
    }
  }
}
</style>
