import Intro from "@/components/Intro.vue";

export default {
  title: "Intro",
  component: Intro,
};

const Template = (args) => ({
  components: { Intro },
  setup() {
    return { args };
  },
  template: '<Intro v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  text: "Rat & Boa is a celebration of our contrasting styles & personalities, a voice for our vision. Born from a shared desire to translate moods into creations that evoke beauty & empower the women of our world.",
};
