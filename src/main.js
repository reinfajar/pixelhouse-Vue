import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "vue-easytable/libs/themes-base/index.css";
import { VTable } from "vue-easytable";

Vue.component(VTable.name, VTable);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
