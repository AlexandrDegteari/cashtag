<template>
  <form @submit.prevent="submit">
    <div class="row black-block mr-lg-0">
      <div class="col-md-6 mt-2">
        <label for="address-line-1">Address Line 1</label>
        <input
          v-model="address1"
          class="mt-1"
          id="address-line-1"
          type="text"
        />
      </div>
      <div class="col-md-6 pl-md-0 mt-2">
        <label for="address-line-2">Address Line 2</label>
        <input
          v-model="address2"
          class="mt-1"
          id="address-line-2"
          type="text"
        />
      </div>
      <div class="col-md-6 mt-1">
        <label>Country *</label>
        <v-select
          v-if="countries"
          :items="countries"
          v-model="$v.country.$model"
          menu-props="auto"
          hide-details
          single-line
          item-text="name"
          item-value="id"
          dense
          background-color="#1f2526"
          height="25px"
        />
      </div>

      <div class="col-md-3 mt-1 pl-md-0 ">
        <label class="mb-1" for="city">City *</label>
        <input v-model="$v.city.$model" id="city" name="city" type="text" />
        <p v-if="$v.city.$dirty && !$v.city.required" class="error">
          City is required
        </p>
      </div>

      <div class="col-md-3 mt-1 pl-md-0 ">
        <label class="mb-1" for="zip-code">Zip Code</label>
        <input v-model="zipCode" id="zip-code" type="text" />
      </div>
      <div class="col-md-6 mt-1">
        <label for="phone-number">Phone Number</label>
        <input
          v-model="phoneNumber"
          class="mt-1"
          id="phone-number"
          type="text"
        />
      </div>
      <div class="col-md-6 pl-md-0 mt-1">
        <label for="whatsapp-number">Whatsapp Number</label>
        <input
          v-model="whatsappNumber"
          class="mt-1"
          id="whatsapp-number"
          type="text"
        />
      </div>
      <p v-if="message" class="text-success ml-3">
        {{ message }}
      </p>
      <div v-if="errors">
        <div v-for="(error, key) in errors" :key="key">
          <div v-for="(item, keyItem) in error" :key="keyItem">
            <p class="error ml-3">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="col-12 text-right pt-0">
        <button
          @click="submit"
          class="btn btn-primary ml-2 mb-2 mt-2"
          type="button"
        >
          update
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import RequestService from "../services/request.service";
import UserService from "../services/user.service";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  props: ["address"],
  mixins: [validationMixin],
  data() {
    return {
      response: null,
      countries: [],
      address1: this.address.address_1 ? this.address.address_1 : "",
      address2: this.address.address_2 ? this.address.address_2 : "",
      whatsappNumber: this.address.whatsapp_number
        ? this.address.whatsapp_number
        : "",
      zipCode: this.address.zip_code ? this.address.zip_code : "",
      city: this.address.city ? this.address.city : "",
      phoneNumber: this.address.phone_number ? this.address.phone_number : "",
      country: this.address.country,
      message: null,
      errors: null
    };
  },
  validations: {
    country: { required },
    city: { required }
  },
  methods: {
    getCountries() {
      RequestService.GetCountries()
        .then(response => {
          this.countries = response;
        })
        .catch(() => {});
    },
    submit() {
      const countryId = this.country.id ? this.country.id : this.country;

      const addressForm = {
        address_1: this.address1,
        address_2: this.address2,
        whatsapp_number: this.whatsappNumber,
        zip_code: this.zipCode,
        phone_number: this.phoneNumber,
        city: this.city,
        country_id: countryId
      };

      this.message = null;
      this.errors = null;

      UserService.UpdateAddress(addressForm)
        .then(response => {
          if (response.status === 200) {
            this.message = "The address has been updated";
          }
          this.$emit("updatedForm");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  beforeMount() {
    this.getCountries();
  }
};
</script>

<style lang="scss" scoped>
::v-deep .mdi-menu-down::before {
  color: #acacad;
}

::v-deep .theme--light.v-select .v-select__selection--comma {
  color: #acacad;
  font-size: 12px;
}

::v-deep .v-select__selections input:focus {
  background-color: #1f2526;
}
</style>
