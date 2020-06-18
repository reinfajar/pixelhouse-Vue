<template>
  <div>
    <v-table
      :title-rows="tableConfig.titleRows"
      :columns="tableConfig.columns"
      :table-data="tableData"
      :is-loading="isLoading"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      style="width:100%"
      is-horizontal-resize
      :vertical-resize-offset="5"
      :min-height="200"
      :multiple-sort="tableConfig.multipleSort"
      sort-always
      @sort-change="sortChange"
      :select-change="selectChange"
      :select-all="selectAll"
    >
    </v-table>
    <Button
      :disabled="disabled"
      @bulkUpdate="bulkUpdate"
      @bulkDelete="bulkDelete"
    />
    <b-modal
      id="modal"
      ref="modal-1-ref"
      hide-footer
      :hide-header-close="true"
      no-close-on-backdrop
      no-close-on-esc
      header-bg-variant="secondary"
      footer-bg-variant="secondary"
    >
      <UpdateData :data="data" @closeModal="closeModal" />
    </b-modal>
    <b-modal
      id="modal-2"
      ref="modal-2"
      hide-footer
      :hide-header-close="true"
      no-close-on-backdrop
      no-close-on-esc
      header-bg-variant="success"
      footer-bg-variant="success"
    >
      <div class="d-block text-center">
        <h3>{{ data.name }}</h3>
        <h3>{{ data.username }}</h3>
        <h3>
          {{ data.street }}, {{ data.suite }}, {{ data.city }},
          {{ data.zipcode }}
        </h3>
      </div>
      <b-button class="mt-3" block @click.prevent="closeModal()"
        >Close Detail</b-button
      >
    </b-modal>
    <b-modal
      id="modal-3"
      ref="modal-3"
      hide-footer
      :hide-header-close="true"
      no-close-on-backdrop
      no-close-on-esc
      header-bg-variant="danger"
      footer-bg-variant="danger"
    >
      <Confirmation
        v-if="forDelete.length !== 0"
        :selection="forDelete"
        @closeModal="closeModal"
      />
      <Confirmation v-else :selection="selections" @closeModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import UpdateData from "./updateModals";
import Confirmation from "./confirmation";
import Button from "./button";
export default {
  name: "Table",
  components: {
    UpdateData,
    Confirmation,
    Button
  },
  data() {
    return {
      tableConfig: {
        multipleSort: true,
        columns: [
          {
            field: "selection",
            type: "selection",
            isFrozen: true,
            width: 50,
            titleAlign: "center",
            columnAlign: "center"
          },
          {
            field: "name",
            title: "Name",
            width: 190,
            titleAlign: "center",
            columnAlign: "center",
            orderBy: "asc",
            isResize: true,
            columnCellClassName: "nameClickable",
            formatter: function(rowData) {
              return `<div>
                      <a href="#" class="name"><p>${rowData.name}</p></a>
                    </div>`;
            }
          },
          {
            field: "username",
            title: "Username",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            orderBy: "desc",
            isResize: true,
            formatter: function(rowData) {
              return `<div>
                      <a href="#" class="username"><p>${rowData.username}</p></a>
                    </div>`;
            }
          },
          {
            field: "street",
            title: "Street",
            width: 150,
            titleAlign: "center",
            columnAlign: "left"
          },
          {
            field: "suite",
            title: "Suite",
            width: 100,
            titleAlign: "center",
            columnAlign: "left"
          },
          {
            field: "city",
            title: "City",
            width: 150,
            titleAlign: "center",
            columnAlign: "left"
          },
          {
            field: "zipcode",
            title: "Zipcode",
            width: 100,
            titleAlign: "center",
            columnAlign: "left"
          },
          {
            field: "Action",
            title: "Action",
            width: 150,
            titleAlign: "center",
            columnAlign: "center",
            // componentName: tableAction,
            isResize: true,
            formatter: function() {
              return `<div>
                      <button class="update btn btn-outline-secondary">Edit</button>
                      <button class="delete btn btn-outline-danger">Delete</button=>
                    </div>`;
            }
          }
        ],
        titleRows: [
          [
            {
              fields: ["selection"],
              titleAlign: "center",
              rowspan: 2
            },
            {
              fields: ["name", "username"],
              title: "User Data",
              titleAlign: "center",
              colspan: 2
            },
            {
              fields: ["street", "suite", "city", "zipcode"],
              title: "Address",
              titleAlign: "center",
              colspan: 4
            },
            {
              fields: ["Action"],
              title: "Action",
              titleAlign: "center",
              rowspan: 2
            }
          ],
          [
            {
              fields: ["name"],
              title: "Name",
              titleAlign: "center",
              orderBy: "asc"
            },
            {
              fields: ["username"],
              title: "Username",
              titleAlign: "center",
              orderBy: "asc"
            },
            { fields: ["street"], title: "Street", titleAlign: "center" },
            { fields: ["suite"], title: "Suite", titleAlign: "center" },
            { fields: ["city"], title: "City", titleAlign: "center" },
            { fields: ["zipcode"], title: "Zipcode", titleAlign: "center" }
          ]
        ]
      },
      data: {},
      selections: [],
      forDelete: [],
      selection: false
    };
  },
  computed: {
    tableData() {
      return this.$store.state.data.tableData;
    },
    isLoading() {
      return this.$store.state.active.loading;
    },
    disabled() {
      let status = false;
      if (!this.selection) {
        status = true;
      } else {
        status = false;
      }
      return status;
    }
  },
  methods: {
    sortChange(params) {
      for (const keys in params) {
        this.tableConfig.columns.forEach(el => {
          if (
            el.field === keys &&
            params[keys] === "asc" &&
            el.orderBy !== params[keys]
          ) {
            el.orderBy = "asc";
            this.tableData.sort((a, b) => a[keys].localeCompare(b[keys]));
            this.$store.commit("SET_TABLEDATA", this.tableData);
          } else if (
            el.field === keys &&
            params[keys] === "desc" &&
            el.orderBy !== params[keys]
          ) {
            el.orderBy = "desc";
            this.tableData
              .sort((a, b) => a[keys].localeCompare(b[keys]))
              .reverse();
            this.$store.commit("SET_TABLEDATA", this.tableData);
          } else if (
            el.field === keys &&
            params[keys] === "desc" &&
            el.orderBy === params[keys]
          ) {
            el.orderBy = "asc";
            this.tableData.sort((a, b) => a[keys].localeCompare(b[keys]));
            this.$store.commit("SET_TABLEDATA", this.tableData);
          }
        });
      }
    },
    selectAll(selection) {
      this.selections = selection;
      if (this.selections.length !== 0) {
        this.selection = true;
      } else {
        this.selection = false;
      }
    },
    selectChange(selection) {
      this.selections = selection;
      if (this.selections.length !== 0) {
        this.selection = true;
      } else {
        this.selection = false;
      }
    },
    closeModal() {
      this.$refs["modal-1-ref"].hide();
      this.$store.commit("SET_LOADING", false);
      this.$refs["modal-2"].hide();
      this.$refs["modal-3"].hide();
      this.data = {};
      this.forDelete = [];
    },
    updateData(index) {
      this.data = this.tableData[index];
      this.$refs["modal-1-ref"].show();
    },
    bulkUpdate() {
      this.selection = true;
      this.data.array = this.selections;
      this.$refs["modal-1-ref"].show();
    },
    deleteData(index) {
      this.forDelete = [this.tableData[index]];
      this.$refs["modal-3"].show();
    },
    bulkDelete() {
      this.$refs["modal-3"].show();
    },
    modalInfo(index) {
      this.data = this.tableData[index];
      this.$refs["modal-2"].show();
    }
  },
  mounted() {
    const update = document.querySelectorAll(".update");
    update.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.updateData(i);
      });
    });
    const del = document.querySelectorAll(".delete");
    del.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.deleteData(i);
      });
    });
    const forName = document.querySelectorAll(".name");
    forName.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.modalInfo(i);
      });
    });
    const username = document.querySelectorAll(".username");
    username.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.modalInfo(i);
      });
    });
  }
};
</script>

<style></style>
