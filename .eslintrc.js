const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended", // use 'plugin:vue/vue3-essential' for less strict linting rules - https://eslint.vuejs.org/rules
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Shopify: "readonly",
  },
  ignorePatterns: [
    /**
     * ignore certain files
     * docs: https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files
     */
    // 'my-file.js',
    // '**/my-directory/*.js'
    "**/*.liquid",
  ],
  rules: {
    /**
     * add custom rules
     * docs: https://eslint.org/docs/rules
     */
    "prettier/prettier": "error",
    "no-unused-vars": isDevelopment ? "off" : "error",
    // 'quotes': ['error', 'single'],
    // 'semi': ['error', 'never']
  },
};
