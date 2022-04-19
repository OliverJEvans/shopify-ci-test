<template>
  <div class="container">
    <div v-if="shouldShowRecentSearches" class="search-panel">
      <span class="search-panel__heading">Recent Searches</span>
      <ul class="recent-searches">
        <li
          v-for="search in orderedRecentSearches"
          :key="search.id"
          class="recent-searches__item"
        >
          <button
            type="button"
            class="recent-searches__link"
            @click="updateSearchTerm(search.value)"
          >
            {{ search.value }}
          </button>
          <button type="button" @click="removeRecentSearch(search)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { unwrapNodes } from "@/helpers/graphql";
import { mapActions, mapGetters, mapState } from "vuex";
import PhotoTile from "@/components/PhotoTile.vue";

export default {
  name: "SearchRecent",
  component: {
    PhotoTile,
  },
  computed: {
    ...mapState("search", ["recentSearches"]),
    ...mapGetters("search", ["orderedRecentSearches"]),
    shouldShowRecentSearches() {
      return !!this.recentSearches.length > 0;
    },
  },
  created() {
    this.fetchRecentSearches();
  },
  methods: {
    ...mapActions("search", ["fetchRecentSearches", "removeRecentSearch"]),
    unwrapNodes,
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
