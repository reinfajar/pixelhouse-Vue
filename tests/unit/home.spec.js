import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home/index.vue";
const { name, components } = Home;

describe("Home", () => {
  let index;
  beforeEach(() => {
    index = shallowMount(Home);
  });

  it("have name", () => {
    expect(name).toBe("Home");
  });

  it("renders filter", () => {
    expect(index.html()).toContain(`b-input`);
    expect(index.html()).toContain("vtable-stub");
  });

  it("has script", () => {
    expect(typeof Home.data).toBe(`function`);
    expect(typeof Home.components).toBe(`object`);
    expect(typeof Home.computed).toBe(`object`);
  });

  it("renders component name", () => {
    expect(components).toHaveProperty("VTable");
    expect(components).toHaveProperty("Filtered");
  });

  it("return", () => {
    expect(Home.data().filters).toBe("");
    expect(Home.computed.filtered()).toBe(false);
  });
});
