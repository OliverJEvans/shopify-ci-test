import { client as apollo } from "@/graphql/vue-apollo";
import createCustomerAccessTokenMutation from "@/graphql/mutations/CreateCustomerAccessToken.gql";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";

const state = {
  isBurgerMenuOpen: false,
  customerAccessToken: null,
  isFiltersOpen: false,
  userPreferences: {},
};

const mutations = {
  toggleBurgerMenuState(state) {
    state.isBurgerMenuOpen = !state.isBurgerMenuOpen;
  },
  setIsFiltersOpenState(state, value) {
    state.isFiltersOpen = value;
  },
  setCustomerAccessToken(state, value) {
    state.customerAccessToken = value;
  },
  setUserPreferences(state, value) {
    state.userPreferences = value;
  },
};

const getters = {
  isLoggedIn: (state) => {
    if (state.customerAccessToken) {
      return true;
    }

    return false;
  },
  collectionPageLayout: (state) => {
    if (isEmpty(state.userPreferences)) {
      return "grid";
    }
    return state.userPreferences["collectionPageLayout"] || "grid";
  },
};

const actions = {
  checkAccessToken({ commit }) {
    const itemStr = localStorage.getItem("shopifyCustomerAccessToken");

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem("shopifyCustomerAccessToken");
      commit("setCustomerAccessToken", null);
      return null;
    }

    commit("setCustomerAccessToken", item);
  },
  getUserPreferences({ commit }) {
    const userPreferences = localStorage.getItem("shopifyUserPreferences");
    commit("setUserPreferences", JSON.parse(userPreferences));
  },
  toggleMobileMenu({ commit, state }) {
    commit("toggleBurgerMenuState");
    const siteHtml = document.getElementsByTagName("html")[0];
    state.isBurgerMenuOpen
      ? siteHtml.classList.add("mobile-nav--open")
      : siteHtml.classList.remove("mobile-nav--open");
  },
  async attemptLogin({ dispatch }, { email, password }) {
    const { data } = await apollo.mutate({
      mutation: createCustomerAccessTokenMutation,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    const token = data.customerAccessTokenCreate.customerAccessToken;
    dispatch("setCustomerAccessToken", token);
  },
  attemptLogOut({ commit }) {
    localStorage.removeItem("shopifyCustomerAccessToken");
    commit("setCustomerAccessToken", null);
  },
  setCustomerAccessToken({ commit }, { accessToken, expiresAt }) {
    const item = {
      value: accessToken,
      expiry: new Date(expiresAt).getTime().toString(),
    };

    localStorage.setItem("shopifyCustomerAccessToken", JSON.stringify(item));

    commit("setCustomerAccessToken", accessToken);
  },
  setUserPreferences({ commit, state }, { key, value }) {
    const userPreferences = cloneDeep(state.userPreferences) || {};
    userPreferences[key] = value;

    localStorage.setItem(
      "shopifyUserPreferences",
      JSON.stringify(userPreferences)
    );

    commit("setUserPreferences", userPreferences);
  },
  setIsFiltersOpen({ commit }, value) {
    commit("setIsFiltersOpenState", value);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
