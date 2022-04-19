import cloneDeep from "lodash/cloneDeep";

const state = {
  searchTerm: null,
  recentSearches: [],
};

const mutations = {
  setSearchTerm(state, value) {
    state.searchTerm = value;
  },
  setRecentSearch(state, value) {
    state.recentSearches = value;
  },
};

const getters = {
  orderedRecentSearches: (state) => {
    const recentSearchesCloned = cloneDeep(state.recentSearches) || [];

    const orderedSearches = recentSearchesCloned.sort(
      (a, b) => b.date - a.date
    );

    return orderedSearches.reverse();
  },
};

const actions = {
  fetchRecentSearches({ commit }) {
    commit(
      "setRecentSearch",
      JSON.parse(localStorage.getItem("shopifyRecentSearches"))
    );
  },
  async addSearchTerm({ commit, dispatch }, value) {
    await dispatch("fetchRecentSearches");
    commit("setSearchTerm", value);
    dispatch("addRecentSearch", value);
  },
  removeRecentSearch({ commit, state, dispatch }, item) {
    const recentSearches = cloneDeep(state.recentSearches) || [];

    const index = recentSearches.findIndex((recentSearch) => {
      return recentSearch.date === item.date;
    });

    recentSearches.splice(index, 1);

    commit("setRecentSearch", recentSearches);
    dispatch("setLocationStorage", recentSearches);
  },
  addRecentSearch({ commit, state, dispatch }, value) {
    const recentSearches = cloneDeep(state.recentSearches) || [];
    const maxRecentSearches = 3;

    recentSearches.push({
      date: new Date(),
      value,
    });

    const sliceAmount = Math.max(recentSearches.length - maxRecentSearches);
    const limitedRecentSearches = recentSearches.slice(sliceAmount);

    commit("setRecentSearch", limitedRecentSearches);
    dispatch("setLocationStorage", limitedRecentSearches);
  },
  setLocationStorage(context, value) {
    localStorage.setItem("shopifyRecentSearches", JSON.stringify(value));
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
