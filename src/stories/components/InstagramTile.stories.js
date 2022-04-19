import InstagramTile from "@/components/InstagramTile.vue";

export default {
  title: "InstagramTile",
  component: InstagramTile,
};

const Template = (args) => ({
  components: { InstagramTile },
  setup() {
    return { args };
  },
  template: '<InstagramTile v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  tileImageUrl:
    "https://cdn.shopify.com/s/files/1/0942/9062/files/instagram-tile-1.jpg",
  tileLinkUrl: "ratandboa.com",
};
