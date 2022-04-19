import Accordion from "@/components/Accordion";
import { shallowMount } from "@vue/test-utils";

describe("Accordion", () => {
  describe("render", () => {
    it("renders base accordion", async () => {
      const wrapper = shallowMount(Accordion);
      expect(wrapper.exists()).toBe(true);
    });

    it("renders slots", async () => {
      const wrapper = shallowMount(Accordion, {
        slots: {
          header: "HEADER",
          body: "BODY",
        },
      });

      const headerSlot = wrapper.find(".accordion__header");
      expect(headerSlot.text()).toBe("HEADER");

      const bodySlot = wrapper.find(".accordion__body");
      expect(bodySlot.text()).toBe("BODY");
    });
  });

  describe("data", () => {
    it("opens accordion when open prop is true", async () => {
      const wrapper = shallowMount(Accordion);

      expect(wrapper.find(".accordion__body").isVisible()).toBe(false);

      await wrapper.setData({
        open: true,
      });

      expect(wrapper.find(".accordion__body").isVisible()).toBe(true);
    });

    it("closes accordion when open prop is false", async () => {
      const wrapper = shallowMount(Accordion, {
        data() {
          return {
            open: true,
          };
        },
      });

      expect(wrapper.find(".accordion__body").isVisible()).toBe(true);

      await wrapper.setData({
        open: false,
      });

      expect(wrapper.find(".accordion__body").isVisible()).toBe(false);
    });
  });

  describe("user interaction", () => {
    const wrapper = shallowMount(Accordion, {
      slots: {
        header: "HEADER",
        body: "BODY",
      },
    });

    it("toggles open state from false to true", async () => {
      expect(wrapper.vm.open).toBe(false);

      await wrapper.find(".accordion__header").trigger("click");

      expect(wrapper.vm.open).toBe(true);
    });

    it("toggles open state from true to false", async () => {
      expect(wrapper.vm.open).toBe(true);

      await wrapper.find(".accordion__header").trigger("click");

      expect(wrapper.vm.open).toBe(false);
    });
  });
});
