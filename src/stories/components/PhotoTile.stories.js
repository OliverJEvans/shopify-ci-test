import PhotoTile from "@/components/PhotoTile.vue";

export default {
  title: "PhotoTile",
  component: PhotoTile,
};

const dummyProduct = {
  id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc1NzA5ODAyMDg4ODU=",
  title: "Athena Dress",
  handle: "athena",
  onlineStoreUrl: "https://google.co.uk/",
  priceRange: {
    minVariantPrice: {
      amount: "195.0",
      currencyCode: "GBP",
    },
  },
  images: {
    edges: [
      {
        node: {
          id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMzY2OTc5NDk2MzQ4MDU=",
          altText: "hide",
          src: "https://cdn.shopify.com/s/files/1/0625/6374/6037/products/Athena.jpg?v=1644850424",
        },
      },
    ],
  },
};

const Template = (args) => ({
  components: { PhotoTile },
  setup() {
    return { args };
  },
  template: '<PhotoTile v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  imageUrl: "https://via.placeholder.com/280x420/",
  title: "Fancy dress",
};

export const Linked = Template.bind({});
Linked.args = {
  ...Default.args,
  link: "https://google.co.uk",
};

export const Product = Template.bind({});
Product.args = {
  product: dummyProduct,
};
