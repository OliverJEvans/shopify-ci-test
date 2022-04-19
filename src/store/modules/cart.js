import { client as apollo } from "@/graphql/vue-apollo";

import addToCartMutation from "@/graphql/mutations/AddToCart.gql";
import removeFromCartMutation from "@/graphql/mutations/RemoveFromCart.gql";
import updateItemInCartMutation from "@/graphql/mutations/UpdateInCart.gql";

const state = {
  cartData: null,
};

const mutations = {
  setCartDataState(state, value) {
    state.cartData = value;
  },
};

const getters = {};

const actions = {
  setCartData({ commit }, value) {
    commit("setCartDataState", value);
  },
  async addCartItem({ dispatch }, { id, quantity }) {
    const cartId = localStorage.getItem("shopifyCartId");

    try {
      const { data } = await apollo.mutate({
        mutation: addToCartMutation,
        variables: {
          cartId: cartId,
          lines: [
            {
              quantity,
              merchandiseId: id,
            },
          ],
        },
      });

      dispatch("setCartData", data.cartLinesAdd.cart);
    } catch (error) {
      console.log(error);
    }
  },
  async removeCartItem({ dispatch }, cardLineId) {
    const cartId = localStorage.getItem("shopifyCartId");

    try {
      const { data } = await apollo.mutate({
        mutation: removeFromCartMutation,
        variables: {
          cartId,
          lineIds: [cardLineId],
        },
      });

      dispatch("setCartData", data.cartLinesRemove.cart);
    } catch (error) {
      console.log(error);
    }
  },
  async updateCartItem({ dispatch }, line) {
    const cartId = localStorage.getItem("shopifyCartId");

    try {
      const { data } = await apollo.mutate({
        mutation: updateItemInCartMutation,
        variables: {
          cartId,
          lines: [line],
        },
      });

      dispatch("setCartData", data.cartLinesUpdate.cart);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
