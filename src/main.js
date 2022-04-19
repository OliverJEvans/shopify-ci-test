/**
 * imports
 */
import { createApp } from "vue";
import store from "./store";
import { apolloProvider } from "./graphql/vue-apollo";
import vueDebounce from "vue-debounce";
import VueResizeObserver from "vue-resize-observer";
import "@/assets/css/main.scss";
import { toCurrency, pluralize } from "./filters";

/**
 * create vue instance function
 */
const createVueApp = () => {
  const app = createApp({
    mounted() {
      store.dispatch("app/checkAccessToken");
      store.dispatch("app/getUserPreferences");
    },
  });

  /**
   * vue filters
   * are no longer supported in vue 3, use globalProps instead
   */
  app.config.globalProperties.$filters = {
    toCurrency,
    pluralize,
  };

  /**
   * vue views
   * auto-import all vue components
   */
  const vueViews = require.context("./views/", true, /\.(vue|js)$/);

  vueViews.keys().forEach((key) => {
    const view = vueViews(key).default;

    // if a component has a name defined use the name, else use the path as the component name
    const name = view.name
      ? view.name
      : key
          .replace(/\.(\/|vue|js)/g, "")
          .replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());

    app.component(name, view);
  });

  /**
   * vue components
   * auto-import all vue components
   */
  const vueComponents = require.context("./components/", true, /\.(vue|js)$/);

  vueComponents.keys().forEach((key) => {
    const component = vueComponents(key).default;

    // if a component has a name defined use the name, else use the path as the component name
    const name = component.name
      ? component.name
      : key
          .replace(/\.(\/|vue|js)/g, "")
          .replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());

    app.component(name, component);
  });

  /**
   * vue mixins
   * auto-register all mixins with a 'global' keyword in their filename
   */
  const mixins = require.context("./mixins/", true, /.*global.*\.js$/);

  mixins.keys().forEach((key) => {
    app.mixin(mixins(key).default);
  });

  /**
   * vue plugins
   */

  app.use(VueResizeObserver);
  app.use(apolloProvider);
  app.use(vueDebounce);
  app.use(store);

  return app;
};

/**
 * create and mount vue instance(s)
 */
const appElement = document.querySelector("#app");

if (appElement) {
  createVueApp().mount(appElement);
} else {
  const vueElements = document.querySelectorAll("[vue]");
  if (vueElements) vueElements.forEach((el) => createVueApp().mount(el));
}

/**
 * fixes for Shopify sections
 * 1. properly render vue components on user insert in the theme editor
 * 2. reload the current page to rerender async inserted sections with vue components
 *
 * add the 'vue' keyword to the section's wrapper classes if the section uses any vue functionality e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", (event) => {
    if (event.target.classList.value.includes("vue")) {
      createVueApp().mount(event.target);
    }
  });
} else if (!Shopify.designMode && process.env.NODE_ENV === "development") {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((record) => {
      const vue = Array.from(record.addedNodes).find(
        (node) => node.classList && node.classList.value.includes("vue")
      );
      if (vue) window.location.reload();
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
