import { shallowMount, createLocalVue } from "@vue/test-utils";
import Table from "../../src/views/Home/components/table.vue";
const { name, components, data, computed, methods, mounted } = Table;
import Vuex from "vuex";
import store from "../../src/store/index";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Table", () => {
  let table;
  beforeEach(() => {
    table = shallowMount(Table, { store, localVue });
  });

  it("have name", () => {
    expect(name).toBe("Table");
  });

  it("renders", () => {
    expect(table.html()).toContain(`v-table`);
    expect(table.html()).toContain(`b-modal`);
    expect(table.html()).toContain(`b-button`);
    expect(table.html()).toContain(`h3`);
  });

  it("has script", () => {
    expect(typeof data).toBe(`function`);
    expect(typeof components).toBe(`object`);
    expect(typeof computed).toBe(`object`);
    expect(typeof methods).toBe(`object`);
    expect(typeof mounted).toBe(`function`);
  });

  it("renders component name", () => {
    expect(components).toHaveProperty("UpdateData");
    expect(components).toHaveProperty("Confirmation");
    expect(components).toHaveProperty("Button");
  });

  it("return data", () => {
    expect(data().tableConfig).toHaveProperty("multipleSort");
    expect(data().tableConfig).toHaveProperty("columns");
    expect(data().data).toStrictEqual({});
    expect(data().selections).toStrictEqual([]);
    expect(data().forDelete).toStrictEqual([]);
    expect(data().selection).toBe(false);
  });

  it("computed a data", () => {
    expect(typeof computed.tableData).toBe("function");
    expect(typeof computed.isLoading).toBe("function");
    expect(typeof computed.disabled).toBe("function");
  });

  it("methods", () => {
    expect(typeof methods.sortChange).toBe("function");
    expect(typeof methods.selectAll).toBe("function");
    expect(typeof methods.selectChange).toBe("function");
    expect(typeof methods.closeModal).toBe("function");
    expect(typeof methods.updateData).toBe("function");
    expect(typeof methods.bulkUpdate).toBe("function");
    expect(typeof methods.deleteData).toBe("function");
    expect(typeof methods.bulkDelete).toBe("function");
    expect(typeof methods.modalInfo).toBe("function");
  });
});
