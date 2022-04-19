<template>
  <section
    v-show="isActive"
    :id="computedId"
    ref="tab"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script>
import { inject, watch, ref, onBeforeMount, onBeforeUnmount } from "vue";

export default {
  name: "Tab",
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isActive = ref(false);

    const tabsProvider = inject("tabsProvider");
    const addTab = inject("addTab");
    const updateTab = inject("updateTab");
    const deleteTab = inject("deleteTab");

    const computedId = props.id
      ? props.id
      : props.name.toLowerCase().replace(/ /g, "-");
    const hash = "#" + (!props.isDisabled ? computedId : "");

    watch(
      () => tabsProvider.activeTabHash,
      () => {
        isActive.value = hash === tabsProvider.activeTabHash;
      }
    );

    watch(
      () => Object.assign({}, props),
      () => {
        updateTab(computedId, {
          name: props.name,
          header: props.name,
          isDisabled: props.isDisabled,
          hash: hash,
          index: tabsProvider.tabs.length,
          computedId: computedId,
        });
      }
    );

    onBeforeMount(() => {
      addTab({
        name: props.name,
        header: props.name,
        isDisabled: props.isDisabled,
        hash: hash,
        index: tabsProvider.tabs.length,
        computedId: computedId,
      });
    });

    onBeforeUnmount(() => {
      deleteTab(computedId);
    });

    return {
      computedId,
      hash,
      isActive,
    };
  },
};
</script>
