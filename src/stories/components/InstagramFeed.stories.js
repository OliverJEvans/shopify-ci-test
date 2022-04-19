import InstagramFeed from "@/components/InstagramFeed.vue";

export default {
  title: "InstagramFeed",
  component: InstagramFeed,
};

const Template = (args) => ({
  components: { InstagramFeed },
  setup() {
    return { args };
  },
  template: '<InstagramFeed v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  heading: "For the bold and spirited",
  subheading: "Spotlight on @ratandboa",
  tiles: [
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/instagram-tile-1.jpg",
      linkUrl: "ratandboa.com",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1191/9918/files/instagram-tile-2.jpg",
      linkUrl: "ratandboa.com",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1191/9918/files/instagram-tile-3.jpg",
      linkUrl: "ratandboa.com",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1191/9918/files/instagram-tile-4.jpg",
      linkUrl: "ratandboa.com",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/instagram-tile-1.jpg",
      linkUrl: "ratandboa.com",
    },
  ],
};
