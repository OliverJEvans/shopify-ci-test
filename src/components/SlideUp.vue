<template>
  <Transition name="fade">
    <div v-if="open" class="blur" @click="close"></div>
  </Transition>
  <Transition name="slide" @enter="slideUp" @leave="slideDown">
    <div
      v-if="open"
      ref="panel"
      v-resize="onResize"
      class="panel"
      :class="{ 'panel--open': open }"
    >
      <div ref="panel-header" class="panel__header">
        {{ heading }}
        <IconButton icon="cross" @click="close" />
      </div>
      <div ref="panel-content" class="panel__content">
        <slot name="content" />
      </div>
      <div v-if="!!$slots.footer" ref="panel-footer" class="panel__footer">
        <slot name="footer" />
      </div>
    </div>
  </Transition>
</template>

<script>
import IconButton from "@/components/IconButton.vue";

export default {
  components: {
    IconButton,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      required: true,
    },
  },
  emits: ["update:open"],
  methods: {
    close() {
      this.$emit("update:open", false);
    },
    slideUp(element) {
      element.style.bottom = "auto";

      const height = getComputedStyle(element).height;
      element.style.bottom = "-" + height;

      requestAnimationFrame(() => {
        element.style.bottom = "0";
      });
    },
    slideDown(element) {
      element.style.bottom = "-" + getComputedStyle(element).height;
    },
    onResize({ height }) {
      const windowHeight = window.innerHeight;
      const bufferPadding = 70;
      const headerHeight = this.$refs["panel-header"].offsetHeight || 0;
      const footerHeight = this.$refs["panel-footer"].offsetHeight || 0;

      if (height + bufferPadding >= windowHeight) {
        const newContentHeight =
          windowHeight - bufferPadding - headerHeight - footerHeight;
        this.$refs["panel-content"].style.maxHeight = newContentHeight + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.panel {
  transform: translate3d(0, 0, 0);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background: $color-white;
  height: auto;
  width: 100%;
  z-index: 2;
  transition: bottom 0.3s;
  transition-timing-function: ease-in;

  &--open {
    transition-timing-function: ease-out;
  }

  &__header {
    padding: 16px 20px;
    font-size: 16px;
    font-family: $heading-font-family;
    text-transform: uppercase;
    background-color: $color-light;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__footer {
    padding: 20px;
    background-color: $color-light;
    border-top: 1px solid rgba($color-dark, 0.2);
  }

  &__content {
    padding: 20px;
    overflow-y: scroll;
  }
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
