const store = {
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {}
};

export default store;
