import Accordion from "@/components/Accordion.vue";

export default {
  title: "Accordion",
  component: Accordion,
};

export const Default = () => ({
  components: { Accordion },
  template:
    "<Accordion><template #header>Header</template><template #body>Body</template></Accordion>",
});

export const ShowArrow = () => ({
  components: { Accordion },
  template:
    '<Accordion :showArrow="true"><template #header>Header</template><template #body>Body</template></Accordion>',
});
