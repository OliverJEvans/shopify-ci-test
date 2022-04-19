import LoyaltyArea from "@/components/LoyaltyArea.vue";

export default {
  title: "LoyaltyArea",
  component: LoyaltyArea,
};

const Template = (args) => ({
  components: { LoyaltyArea },
  setup() {
    return { args };
  },
  template: '<LoyaltyArea v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  heading: "Members Only",
  images: {
    smallMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/loyalty-area.jpg",
    mediumMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/loyalty-area.jpg",
    largeMedia:
      "https://cdn.shopify.com/s/files/1/0942/9062/files/loyalty-area-desktop.jpg",
  },
  links: [
    { url: "ratandboa.com", text: "Sign Up to Start Earning" },
    { url: "ratandboa.com", text: "Login to Your Account" },
  ],
};
