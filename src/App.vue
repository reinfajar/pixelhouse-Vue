<template>
  <div id="app">
    <Navbar />
    <router-view class="mt-3" />
  </div>
</template>

<script>
import data from "./dummy/dummydata";
import Navbar from "./components/navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    this.$store.commit("SET_TABLEDATA", data);
  }
};
</script>

<style lang="scss">
$bgcolor: linear-gradient(to right, #00416a, #e4e5e6);

body {
  background: $bgcolor;
}
</style>
