import Vue from "vue";
import Vuex from "vuex";
import data from "./data/index";
import active from "./active/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    data,
    active
  }
});
