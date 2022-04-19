<template>
  <div class="tabs-component">
    <ul role="tablist" class="tabs-component-tabs">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        class="tabs-component-tab"
        :class="{
          'is-disabled': tab.isDisabled,
          'is-active': tab.isActive,
        }"
        role="presentation"
      >
        <button
          :aria-controls="tab.hash"
          :aria-selected="tab.isActive"
          class="tabs-component-tab-a"
          :class="{
            'is-disabled': tab.isDisabled,
            'is-active': tab.isActive,
          }"
          role="tab"
          @click="selectTab(tab.hash, $event)"
        >
          {{ tab.header }}
        </button>
      </li>
    </ul>
    <div class="tabs-component-panels">
      <slot />
    </div>
  </div>
</template>

<script>
import { reactive, provide, onMounted, toRefs } from "vue";
export default {
  emits: ["changed", "clicked"],

  setup(props, context) {
    const state = reactive({
      activeTabHash: "",
      lastActiveTabHash: "",
      tabs: [],
    });

    provide("tabsProvider", state);

    provide("addTab", (tab) => {
      state.tabs.push(tab);
    });

    provide("updateTab", (computedId, data) => {
      let tabIndex = state.tabs.findIndex(
        (tab) => tab.computedId === computedId
      );
      state.tabs[tabIndex] = data;
    });

    provide("deleteTab", (computedId) => {
      let tabIndex = state.tabs.findIndex(
        (tab) => tab.computedId === computedId
      );
      state.tabs.splice(tabIndex, 1);
    });

    const selectTab = (selectedTabHash, event) => {
      if (event) {
        event.preventDefault();
      }

      const selectedTab = findTab(selectedTabHash);
      if (!selectedTab) {
        return;
      }

      if (event && selectedTab.isDisabled) {
        event.preventDefault();
        return;
      }

      if (state.lastActiveTabHash === selectedTab.hash) {
        context.emit("clicked", { tab: selectedTab });
        return;
      }

      state.tabs.forEach((tab) => {
        tab.isActive = tab.hash === selectedTab.hash;
      });

      context.emit("changed", { tab: selectedTab });

      state.lastActiveTabHash = state.activeTabHash = selectedTab.hash;
    };

    const findTab = (hash) => {
      return state.tabs.find((tab) => tab.hash === hash);
    };

    onMounted(() => {
      if (!state.tabs.length) {
        return;
      }
      selectTab(state.tabs[0].hash);
    });

    return {
      ...toRefs(state),
      selectTab,
      findTab,
    };
  },
};
</script>
