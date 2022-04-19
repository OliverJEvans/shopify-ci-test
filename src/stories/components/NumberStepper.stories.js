import NumberStepper from "@/components/NumberStepper.vue";

export default {
  title: "NumberStepper",
  component: NumberStepper,
};

const Template = (args) => ({
  components: { NumberStepper },
  setup() {
    return { args };
  },
  template: "<NumberStepper />",
});

export const Default = Template.bind({});
