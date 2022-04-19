import Hero from "@/components/Hero.vue";

export default {
  title: "Hero",
  component: Hero,
};

const Template = (args) => ({
  components: { Hero },
  setup() {
    return { args };
  },
  template: '<Hero v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  heading: "Another Time, Another World",
  linkText: "Shop The Collection",
  linkUrl: "https://www.ratandboa.com/",
  images: {
    smallMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/homepage-mobile.jpg?v=1648647100",
    mediumMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/homepage-mobile.jpg?v=1648647100",
    largeMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/homepage-desktop.jpg?v=1648647757",
  },
};
