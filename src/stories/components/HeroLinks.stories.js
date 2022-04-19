import HeroLinks from "@/components/HeroLinks.vue";

export default {
  title: "HeroLinks",
  component: HeroLinks,
};

const Template = (args) => ({
  components: { HeroLinks },
  setup() {
    return { args };
  },
  template: '<HeroLinks v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  links: [
    { url: "ratandboa.com", text: "All Dresses" },
    { url: "ratandboa.com", text: "Party Dresses" },
    { url: "ratandboa.com", text: "Beach Dresses" },
    { url: "ratandboa.com", text: "Work Dresses" },
    { url: "ratandboa.com", text: "Accessories" },
  ],
};
