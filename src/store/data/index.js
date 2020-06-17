const store = {
  state: {
    tableData: [],
    filtered: []
  },
  mutations: {
    SET_TABLEDATA(state, payload) {
      state.tableData = payload;
    },
    SET_FILTERED(state, payload) {
      state.filtered = payload;
    },
    UPDATE_DATA(state, payload) {
      state.tableData.map(el => {
        if (el.id === payload.id) {
          el.name = payload.name;
          el.username = payload.username;
          el.street = payload.street;
          el.suite = payload.suite;
          el.city = payload.city;
          el.zipcode = payload.zipcode;
        }
      });
    },
    BULK_UPDATE(state, payload) {
      state.tableData.map(el => {
        payload.data.forEach(x => {
          if (el.id === x.id) {
            el.name = payload.name;
            el.username = payload.username;
            el.street = payload.street;
            el.suite = payload.suite;
            el.city = payload.city;
            el.zipcode = payload.zipcode;
          }
        });
      });
    },
    DELETE_DATA(state, payload) {
      state.tableData.forEach((el, i) => {
        if (el.id === payload.id) {
          state.tableData.splice(i, 1);
        }
      });
    },
    BULK_DELETE(state, payload) {
      state.tableData.forEach((el, i) => {
        payload.forEach(x => {
          if (el.id === x.id) {
            console.log(x);
            state.tableData.splice(i, i + 1);
          }
        });
      });
    }
  },
  actions: {}
};

export default store;
