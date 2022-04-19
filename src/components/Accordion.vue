<template>
  <div class="accordion" :class="{ 'accordion--open': open }">
    <button type="button" class="accordion__header" @click="toggle">
      <slot name="header" />
      <div v-if="showArrow" class="accordion__arrow">
        <i :class="arrowIcon" />
        <span class="u__visually-hidden">Open</span>
      </div>
    </button>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div v-show="open" class="accordion__body" :aria-hidden="!open">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    arrowIcon() {
      return this.open ? "icon-arrow-up" : "icon-arrow-down";
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    enter(element) {
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.height = 0;

      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      element.style.height = getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.expand-enter-active,
.expand-leave-active {
  transition: height 150ms ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

.accordion__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $heading-font-family;
}

.accordion__arrow {
  font-size: 20px;
}
</style>
