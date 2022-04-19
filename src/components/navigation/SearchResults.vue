<template>
  <div class="container">
    <div v-if="shouldShowSearchResults" class="search-panel">
      <span class="search-panel__heading">Search Results</span>
      <ul class="search-results">
        <li
          v-for="result in unwrapNodes(searchResults?.edges)"
          :key="result.id"
          class="search-results__item"
        >
          <PhotoTile :product="result" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import searchProductsQuery from "@/graphql/queries/Search.gql";
import { unwrapNodes } from "@/helpers/graphql";
import { mapState } from "vuex";
import PhotoTile from "@/components/PhotoTile.vue";

export default {
  name: "SearchResults",
  component: {
    PhotoTile,
  },
  computed: {
    ...mapState("search", ["searchTerm"]),
    shouldShowSearchResults() {
      const searchResultNodes = unwrapNodes(this.searchResults?.edges) || [];
      return !!searchResultNodes.length > 0;
    },
  },
  methods: {
    unwrapNodes,
  },
  apollo: {
    searchResults: {
      query: searchProductsQuery,
      skip() {
        return !this.searchTerm;
      },
      variables() {
        return {
          searchQuery: this.searchTerm,
        };
      },
      update: (data) => data.products,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.search-panel {
  padding: 20px 0;

  &__heading {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }
}

.recent-searches {
  &__item {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    padding: 10px 0;
    background: none;
    outline: none;
    border: none;
    font-size: 10px;
    display: block;
  }
}

.search-results {
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;

  & > * {
    flex: 1 0 60.5%;
    margin-right: 2px;

    @include respond-above(md) {
      flex: 1 0 40%;
    }
  }
}
</style>
