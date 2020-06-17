<template>
  <div>
    <div v-if="disabled === false" class="container mt-3">
      <b-button
        @click.prevent="bulkUpdate"
        pill
        variant="secondary"
        v-b-popover.hover.bottom="'This Button is used for Selection Edit'"
        title="Selection Edit"
        class="mr-3"
        >Edit</b-button
      >
      <b-button
        @click.prevent="bulkDelete"
        class="ml-3"
        pill
        variant="danger"
        v-b-popover.hover.bottom="'This Button is used for Selection Delete'"
        title="Selection Delete"
        >Delete</b-button
      >
    </div>
    <div v-else class="container mt-3">
      <b-button
        pill
        variant="secondary"
        v-b-popover.hover.bottom="'This Button is used for Selection Edit'"
        title="Selection Edit"
        class="mr-3"
        disabled
        >Edit</b-button
      >
      <b-button
        class="ml-3"
        pill
        variant="danger"
        v-b-popover.hover.bottom="'This Button is used for Selection Delete'"
        title="Selection Delete"
        disabled
        >Delete</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean
  },
  methods: {
    bulkDelete() {
      this.$emit("bulkDelete");
    },
    bulkUpdate() {
      this.$emit("bulkUpdate");
    }
  }
};
</script>

<style></style>
