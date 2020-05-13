<template>
  <form @submit.prevent="submitProfileForm">
    <div class="row">
      <div class="col-md-4 mt-2 ">
        <label for="last_name">Last name *</label>
        <input
          v-model.trim="$v.lastName.$model"
          class="mt-1"
          id="last_name"
          type="text"
        />
        <p v-if="!$v.lastName.required" class="error">
          Last name is required
        </p>
      </div>
      <div class="col-md-4 mt-2 pl-md-0">
        <label for="first_name">First name *</label>
        <input
          v-model.trim="$v.firstName.$model"
          class="mt-1"
          id="first_name"
          type="text"
        />
        <p v-if="!$v.firstName.required" class="error">
          First name is required
        </p>
      </div>
      <div class="col-md-4 pl-md-0 mt-2">
        <label for="middle_name">Middle name</label>
        <input
          v-model.trim="middleName"
          class="mt-1"
          id="middle_name"
          type="text"
        />
      </div>
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
      <div class="col-md-4 pl-md-0 mt-2">
        <div class="row">
          <div class="col-md-12 pt-0">
            <label>Date of birth</label>
            <v-dialog
              ref="dialog"
              v-model="modalDate"
              :return-value.sync="birthDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="#033"
                  v-model="birthDate"
                  readonly
                  v-on="on"
                  class="datepicker mt-1"
                ></v-text-field>
              </template>
              <v-date-picker
                color="rgba(50, 59, 59, 0.95)"
                v-model="birthDate"
                :max="maxDate"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalDate = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(birthDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </div>
        </div>
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
import DateService from "../services/date.service";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  props: ["user"],
  mixins: [validationMixin],
  data() {
    return {
      maxDate: DateService.MaxDate(),
      modalDate: false,
      firstName: this.user.first_name,
      middleName: this.user.middle_name,
      lastName: this.user.last_name,
      birthDate: this.user.birth_date.substr(
        0,
        this.user.birth_date.indexOf(" ")
      ),
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
