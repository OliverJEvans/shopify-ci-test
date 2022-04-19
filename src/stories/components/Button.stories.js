import Button from "@/components/Button.vue";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">{{ args.slot }}</Button>',
});

export const Default = Template.bind({});
Default.args = {
  fullWidth: false,
  slot: "Button",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  fullWidth: true,
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: "small",
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: "large",
};

export const Transparent = Template.bind({});
Transparent.args = {
  ...Default.args,
  transparent: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  theme: "secondary",
};

export const Outline = Template.bind({});
Outline.args = {
  ...Default.args,
  theme: "outline",
};

export const Anchor = Template.bind({});
Anchor.args = {
  ...Default.args,
  tag: "a",
  href: "https://google.co.uk",
};
