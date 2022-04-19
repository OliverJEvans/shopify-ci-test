<template>
  <ul class="types">
    <li v-for="type in types" :key="type.id">
      <button class="types__button" @click="handleTypeClick(type)">
        {{ type.label }} ({{ type.count }})
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProductTypes",
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["change"],
  methods: {
    handleTypeClick(type) {
      this.$emit("change", JSON.parse(type.input));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.types {
  overflow: auto;
  white-space: nowrap;

  @include respond-above(md) {
    overflow: visible;
    white-space: normal;
    flex: 1 0 auto;
    padding-left: 20px;
  }

  li {
    display: inline-block;

    &:first-child {
      .types__button {
        padding-left: 16px;

        @include respond-above(md) {
          padding-left: 0;
        }
      }
    }

    &:last-child {
      .types__button {
        padding-right: 16px;
      }
    }
  }

  &__button {
    background: none;
    outline: none;
    border: none;
    text-transform: uppercase;
    font-size: 9px;
    padding: 20px 8px;
  }
}
</style>
