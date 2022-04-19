import JournalPreviews from "@/components/JournalPreviews.vue";

export default {
  title: "JournalPreviews",
  component: JournalPreviews,
};

const Template = (args) => ({
  components: { JournalPreviews },
  setup() {
    return { args };
  },
  template: '<JournalPreviews v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  articles: [
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/journal-tile-1.jpg?v=1649081140",
      heading: "Winter-Proof Your Wardrobe",
      text: "The layering tips and sartorial tricks you need to wear your favourite R&B pieces all year round.",
      category: "Style Notes",
      linkUrl: "google.com",
      linkText: "Read the Story",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/journal-tile-1.jpg?v=1649081140",
      heading: "Winter-Proof Your Wardrobe",
      text: "The layering tips and sartorial tricks you need to wear your favourite R&B pieces all year round.",
      category: "Style Notes",
      linkUrl: "google.com",
      linkText: "Read the Story",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0942/9062/files/journal-tile-1.jpg?v=1649081140",
      heading: "Winter-Proof Your Wardrobe",
      text: "The layering tips and sartorial tricks you need to wear your favourite R&B pieces all year round.",
      category: "Style Notes",
      linkUrl: "google.com",
      linkText: "Read the Story",
    },
  ],
};
