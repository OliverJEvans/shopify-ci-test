<!-- logo (start) -->
<p align="center">
  <img src="https://cdn.shopify.com/s/files/1/0942/9062/t/7/assets/logo-white.png" width="180px">
</p>

<!-- title / description (start) -->

# Rat & Boa Vue Shopify Theme

This Shopify theme is built using Shopify Theme Lab as a base. Shopify Theme Lab is a customizable modular development environment for blazing-fast Shopify theme creation. It is built on top of the [Shopify CLI](https://shopify.dev/themes/tools/cli) and extends it with additional workflow and building capabilities.

<!-- title / description (end) -->

<!-- install and setup (start) -->

## First time setup

### Recommended VSCode extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Visualise linting errors in the IDE
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting using prettier
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Adds Vue syntax highlighting and other helpers

## Install and run

1. Install Shopify CLI: [installation documentation](https://shopify.dev/apps/tools/cli/installation)
2. Install dependancies: `npm run install`
3. Login to shopify store: `shopify login --store <your-store.myshopify.com>`
4. Start local server: `npm run start`
<!-- install and setup (end) -->

<!-- commands (start) -->

## General Commands

Run these commands as `npm run <command-name>`
| Task | Description |
| --------------- | -------------------------------------------------------------------------------------------- |
| start | run `shopify:serve` and `webpack:watch` tasks simultaneously in parallel |
| build | production build and generates bundle analyzer report (static html file `report.html`)
| deploy | build and upload local files from the `shopify` directory to the store that you're connected |
| deploy:new | same as `deploy` but creates a new unpublished theme |
| webpack:watch | bundle and watch for changes in `src/` files with webpack |
| webpack:build | create minified production files for Shopify in `shopify/assets/` directory |
| shopify:serve | upload the current theme as a development theme to the store that you're connected to |
| shopify:pull | retrieve theme files from Shopify |
| lint | run all `lint:*` tasks in sequence |
| lint:js | lint JavaScript inside the `src/` directory |
| lint:css | lint CSS inside the `src/` directory |
| lint:shopify | run `shopify theme check` in the `shopify` directory |
| fix | same as `lint` task but also fixes any fixable errors |
| fix:js | same as `lint:js` task but also fixes any fixable errors |
| fix:css | same as `lint:css` task but also fixes any fixable errors |
| fix:shopify | same as `lint:shopify` task but also fixes any fixable errors |
| storybook | starts story book in development mode |
| build-storybook | build Storybook as a static web application |
| test | run all test suites |

<!-- commands (end) -->

<!-- directory structure (start) -->

## Directory structure

- `/.storybook` - Storybook config
- `/.vscode` - Project specific IDE settings (using prettier as default formatter)
- `/shopify` - Shopify specific theme files (.liquid files etc)
- `/src` - JS, Vue & SCSS files (including Storybook components)

<!-- directory structure (end) -->
<!-- docs (start) -->

## Documentation

- [Shopify Theme Lab](https://uicrooks.github.io/shopify-theme-lab-docs)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Storybook](https://storybook.js.org/docs/vue/get-started/introduction)
- [Vue 3](https://v3.vuejs.org/guide/introduction.html)
- [Vue Test Utils (Vue 3)](next.vue-test-utils.vuejs.org)
- [Vue 3 Carousel](https://ismail9k.github.io/vue3-carousel/)
<!-- docs (end) -->
