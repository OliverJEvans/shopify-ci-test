import SlideUp from "@/components/SlideUp.vue";

export default {
  title: "SlideUp",
  component: SlideUp,
};

const Template = (args) => ({
  components: { SlideUp },
  setup() {
    return { args };
  },
  template: `
    <SlideUp v-bind="args">
      <template v-if="${"content" in args}" #content>${args.content}</template>
      <template v-if="${"footer" in args}" #footer>${args.footer}</template>
    </SlideUp>
  `,
});

export const Default = Template.bind({});
Default.args = {
  heading: "Slide Up",
  open: true,
};

export const Content = Template.bind({});
Content.args = {
  ...Default.args,
  content: "Content",
};

export const ContentAndFooter = Template.bind({});
ContentAndFooter.args = {
  ...Content.args,
  footer: "Footer",
};
