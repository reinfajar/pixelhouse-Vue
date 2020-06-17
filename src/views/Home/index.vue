<template>
  <div>
    <b-input
      v-model="filters"
      debounce="500"
      placeholder="Search by name or username "
      class="container-fluid w-25"
    ></b-input>
    <div class="container mt-3">
      <Filtered v-if="filtered" />
      <VTable v-else />
    </div>
  </div>
</template>

<script>
import Filtered from "./components/filterTable";
import VTable from "./components/table";
export default {
  name: "Home",
  components: {
    VTable,
    Filtered
  },
  data() {
    return {
      filters: ""
    };
  },
  computed: {
    filtered() {
      let status = false;
      if (this.filters) {
        status = true;
        let payload = this.$store.state.data.tableData.filter(
          el =>
            el.name.toLowerCase().includes(this.filters) ||
            el.username.toLowerCase().includes(this.filters)
        );
        this.$store.commit("SET_FILTERED", payload);
      } else {
        status = false;
      }
      return status;
    }
  }
};
</script>

<style></style>
