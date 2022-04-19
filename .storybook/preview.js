import { app } from "@storybook/vue3";
import VueResizeObserver from "vue-resize-observer";
import { toCurrency, pluralize } from "../src/filters.js";
import "../src/assets/css/base/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

app.use(VueResizeObserver);
app.config.globalProperties.$filters = {
  toCurrency,
  pluralize,
};
