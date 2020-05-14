<template>
  <form @submit.prevent="submitProfileForm">
    <div class="row">
      <div class="col-md-4 mt-2 ">
        <label for="username">Username</label>
        <input
          :value="user.username"
          class="mt-1"
          id="username"
          type="text"
          disabled
        />
      </div>
      <div class="col-md-4 pl-md-0 mt-2">
        <label for="alias">Nickname</label>
        <input v-model.trim="alias" class="mt-1" id="alias" type="text" />
      </div>
      <div class="col-lg-12 text-right py-0 line-btn-success">
        <button
          @click="submitProfileForm"
          type="button"
          class="btn btn-primary ml-2 mb-2"
        >
          update
        </button>
        <p v-if="message" class="text-success">
          {{ message }}
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import UserService from "../services/user.service";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  props: ["user"],
  mixins: [validationMixin],
  data() {
    return {
      alias: this.user.alias,
      message: null
    };
  },
  validations: {
    firstName: { required },
    lastName: { required }
  },
  methods: {
    submitProfileForm() {
      if (this.$v.$invalid) {
        return;
      }

      const profile = {
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        birth_date: this.birthDate,
        alias: this.alias
      };

      this.message = null;

      UserService.UpdateProfile(profile)
        .then(() => {
          this.$emit("updatedForm");
          this.message = "The profile has been successfully updated.";
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .datepicker {
  margin: 0;
  padding: 0;

  div div div.v-text-field__slot input {
    color: #acacad;
  }
}
</style>
