import Picture from "@/components/Picture.vue";

export default {
  title: "Picture",
  component: Picture,
};

const Template = (args) => ({
  components: { Picture },
  setup() {
    return { args };
  },
  template: '<Picture v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  images: {
    smallMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/t/7/assets/hp-dresses-2_2000x.jpg",
    mediumMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/t/7/assets/hp-dresses-2_2000x.jpg",
    largeMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/t/7/assets/hp-swim_2000x.jpg",
  },
};
