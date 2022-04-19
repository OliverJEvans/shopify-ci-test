import CollectionHero from "@/components/CollectionHero.vue";

export default {
  title: "Collection Hero",
  component: CollectionHero,
};

const Template = (args) => ({
  components: { CollectionHero },
  setup() {
    return { args };
  },
  template: '<CollectionHero v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  collection: {
    heading: "Ready to wear",
    images: {
      smallMedia:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/rtw-collection-hero.jpg",
      mediumMedia:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/rtw-collection-hero.jpg",
      largeMedia:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/rtw-collection-hero.jpg",
    },
    links: [
      { url: "ratandboa.com", text: "All Dresses" },
      { url: "ratandboa.com", text: "Party Dresses" },
      { url: "ratandboa.com", text: "Beach Dresses" },
      { url: "ratandboa.com", text: "Work Dresses" },
      { url: "ratandboa.com", text: "Accessories" },
    ],
  },
};
