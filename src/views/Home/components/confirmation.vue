<template>
  <div>
    <div class="d-block text-center">
      <div v-if="selection.length === 1">
        <h2>You will be deleting :</h2>
        <h3>{{ selection[0].name }}</h3>
        <h3>{{ selection[0].username }}</h3>
        <h3>
          {{ selection[0].street }}, {{ selection[0].suite }},
          {{ selection[0].city }},
          {{ selection[0].zipcode }}
        </h3>
      </div>
      <div v-else>
        <h2>You will be deleting multiple data at once</h2>
      </div>
    </div>
    <b-button
      class="mt-3"
      variant="outline-danger"
      block
      @click.prevent="confirm"
      >Delete</b-button
    >
    <b-button
      class="mt-2"
      variant="outline-warning"
      block
      @click.prevent="cancel"
      >Cancel</b-button
    >
  </div>
</template>

<script>
export default {
  props: {
    selection: Array
  },
  methods: {
    confirm() {
      if (this.selection.length === 1) {
        this.$store.commit("DELETE_DATA", this.selection[0]);
      } else {
        this.$store.commit("BULK_DELETE", this.selections);
      }
      this.$emit("closeModal");
    },
    cancel() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style></style>
