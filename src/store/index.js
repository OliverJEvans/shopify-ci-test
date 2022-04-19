import { createStore } from "vuex";

import app from "./modules/app";
import search from "./modules/search";
import cart from "./modules/cart";

export default createStore({
  modules: {
    app,
    search,
    cart,
  },
});
