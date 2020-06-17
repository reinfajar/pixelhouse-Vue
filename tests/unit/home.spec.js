import Home from "../../src/views/Home/index.vue";
const { name, components } = Home;

describe("Home", () => {
  it("renders component name", () => {
    expect(name).toBe("Home");
    expect(components).toHaveProperty("VTable");
    expect(components).toHaveProperty("Filtered");
  });
});
