<template>
  <select @change="handleChange">
    <option v-for="option in sortOptions" :key="option.id" :value="option.id">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  emits: ["change"],
  data() {
    return {
      sortOptions: [
        { label: "Price low to high", key: "PRICE", id: "price_asc" },
        {
          label: "Price high to low",
          key: "PRICE",
          id: "price_desc",
          reverse: true,
        },
        { label: "Newest", key: "CREATED", id: "created_asc" },
        { label: "Most Popular", key: "BEST_SELLING", id: "best_selling" },
      ],
    };
  },
  methods: {
    handleChange({ target }) {
      const option = this.sortOptions.find((obj) => {
        return obj.id === target.value;
      });

      this.$emit("change", {
        key: option.key,
        reverse: option.reverse || false,
      });
    },
  },
};
</script>
