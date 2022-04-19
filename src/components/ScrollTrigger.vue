<template>
  <div class="scroll-trigger" />
</template>

<script>
export default {
  name: "ScrollTrigger",
  props: {
    options: {
      type: Object,
      default: () => ({
        root: null,
        threshold: "0",
      }),
    },
  },
  emits: ["intersected"],
  data: () => ({
    observer: null,
  }),
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersected");
      }
    }, this.options);

    this.observer.observe(this.$el);
  },
  unmounted() {
    this.observer.disconnect();
  },
};
</script>
