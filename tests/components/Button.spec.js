import { mount } from "@vue/test-utils";
import Button from "@/components/Button";

describe("Button", () => {
  it("renders a button", () => {
    const wrapper = mount(Button);
    expect(wrapper.exists()).toBe(true);
  });
});
