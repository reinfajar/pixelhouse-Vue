<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Name :" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="name"
          type="text"
          required
          :autofocus="true"
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="UserName:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="username"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Street:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="street"
          type="text"
          placeholder="Enter Street"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Suite:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="suite"
          type="text"
          placeholder="Enter Suite"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="City:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="city"
          type="text"
          placeholder="Enter City"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Zipcode:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="zipcode"
          type="text"
          placeholder="Enter Zipcode"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    selection: Boolean
  },
  data() {
    return {
      name: "",
      username: "",
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    };
  },
  methods: {
    onSubmit() {
      if (
        this.name === "" ||
        this.username === "" ||
        this.street === "" ||
        this.suite === "" ||
        this.city === "" ||
        this.zipcode === ""
      ) {
        this.makeToast();
      } else {
        let payload = {};
        if (!this.selection) {
          payload = {
            id: this.data.id,
            name: this.name,
            username: this.username,
            street: this.street,
            suite: this.suite,
            city: this.city,
            zipcode: this.zipcode
          };
          this.$store.commit("UPDATE_DATA", payload);
        } else {
          payload = {
            data: this.data.array,
            name: this.name,
            username: this.username,
            street: this.street,
            suite: this.suite,
            city: this.city,
            zipcode: this.zipcode
          };
          this.$store.commit("BULK_UPDATE", payload);
        }
        this.$store.commit("UPDATE_DATA", payload);
        this.$store.commit("SET_LOADING", true);
        this.$emit("closeModal");
      }
    },
    makeToast() {
      this.$bvToast.toast("Data Cant Be Empty", {
        title: `Error`,
        variant: "danger",
        solid: true
      });
    }
  },
  created() {
    if (!this.selection) {
      this.name = this.data.name;
      this.username = this.data.username;
      this.street = this.data.street;
      this.suite = this.data.suite;
      this.city = this.data.city;
      this.zipcode = this.data.zipcode;
    }
  }
};
</script>

<style></style>
