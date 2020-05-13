<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl">
          <div class="form relative-position ">
            <form v-on:submit.prevent>
              <h2 class="q-pt-lg">Create account</h2>
              <div class="input input1 q-mt-md q-mb-md">
                <input
                  id="input"
                  type="text"
                  v-model.trim="$v.username.$model"
                  placeholder="Username"
                />
                <label for="input"></label>
              </div>
              <p
                v-if="$v.username.$dirty && !$v.username.required"
                class="error"
              >
                Username is required
              </p>
              <p v-if="availableUsername === false" class="error">
                Username taken, please choose another one
              </p>
              <div class="input input3 q-mb-md">
                <input
                  v-model.trim="$v.email.$model"
                  id="input1"
                  type="text"
                  placeholder="E - mail"
                />
                <label for="input1"></label>
              </div>
              <p v-if="!$v.email.email" class="error">
                E-mail is invalid
              </p>
              <p v-if="$v.email.$dirty && !$v.email.required" class="error">
                E-mail is required
              </p>
              <p v-if="availableEmail === false" class="error">
                Email taken, please choose another one
              </p>
              <div class="input input2 q-mb-md">
                <input
                  id="input2"
                  type="password"
                  v-model="$v.password.$model"
                  placeholder="Password"
                />
                <label for="input2"></label>
              </div>
              <p
                v-if="$v.password.$dirty && !$v.password.required"
                class="error"
              >
                Password is required
              </p>
              <div class="input input2 q-mb-md">
                <input
                  id="input3"
                  type="password"
                  v-model="$v.passwordConfirmation.$model"
                  placeholder="Password Confirmation"
                />
                <label for="input3"></label>
              </div>
              <p
                v-if="
                  $v.passwordConfirmation.$dirty &&
                    !$v.passwordConfirmation.required
                "
                class="error m-0"
              >
                Confirm Password is required
              </p>
              <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
                Passwords must be identical
              </p>
              <div class="input input4 q-mb-md">
                <!--                <div class="q-pa-md" style="max-width: 300px">-->
                <!--                  <div class="q-gutter-md">-->
                <!--                    <q-select-->
                <!--                      v-if="countries"-->
                <!--                      class="mt-1"-->
                <!--                      :options="countries"-->
                <!--                      v-model="$v.country.$model"-->
                <!--                      menu-props="auto"-->
                <!--                      hide-details-->
                <!--                      single-line-->
                <!--                      item-text="name"-->
                <!--                      item-value="id"-->
                <!--                      dense-->
                <!--                      background-color="#1f2526"-->
                <!--                    ></q-select>-->
                <!--                  </div>-->
                <!--                </div>-->
                <div>
                  <input
                    id="input4"
                    type="text"
                    v-model="$v.country.$model"
                    placeholder="Select Country"
                  />
                  <label for="input4"></label>
                </div>
              </div>
              <p v-if="$v.country.$dirty && !$v.country.required" class="error">
                Country is required
              </p>
              <div class="input input4 q-mb-md">
                <input
                  id="input5"
                  type="text"
                  v-model.trim="$v.city.$model"
                  placeholder="City"
                />
                <label for="input5"></label>
              </div>
              <p v-if="$v.city.$dirty && !$v.city.required" class="error">
                City is required
              </p>
              <div class="input input4 q-mb-md">
                <input
                  id="input6"
                  type="text"
                  v-model.trim="$v.address.$model"
                  placeholder="Address"
                />
                <label for="input6"></label>
              </div>
              <p v-if="$v.address.$dirty && !$v.address.required" class="error">
                Address is required
              </p>
              <div class="forgot q-pb-md">
                <div>
                  <q-checkbox
                    color="blue"
                    keep-color
                    size="sm"
                    v-model="$v.terms.$model"
                  />
                  <label>Terms & Conditions</label>
                </div>
                <div>
                  <q-checkbox
                    color="blue"
                    keep-color
                    size="sm"
                    v-model="$v.age.$model"
                  />
                  <label>I am 18+</label>
                </div>
              </div>
              <p v-if="$v.terms.$dirty && !$v.terms.sameAs" class="error">
                Terms & Conditions are required
              </p>
              <p v-if="$v.age.$dirty && !$v.age.sameAs" class="error">
                Age 18+ are required
              </p>
              <button @click="register" class="btn text-center">
                Create account
              </button>
              <small class="q-pt-md"
                >Are you have already account? than Sign in!</small
              >
              <div v-if="successRegistration" class="text-success">
                You have been registered successfully. Please check your email.
              </div>
              <div v-if="errors" class="mt-0">
                <div v-for="(error, index) in errors.errors" :key="index">
                  <p
                    v-for="(item, index) in error"
                    :key="index"
                    class="text-danger mb-1"
                  >
                    {{ item }}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required, sameAs } from "vuelidate/lib/validators";

import RequestService from "../services/request.service";

export default {
  mixins: [validationMixin],
  data() {
    return {
      response: null,
      errors: null,
      successRegistration: false,
      username: null,
      alias: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      city: null,
      country: null,
      address: null,
      terms: false,
      age: false,
      countries: null,
      availableUsername: null,
      availableEmail: null,
      modalDate: false
    };
  },
  validations: {
    username: { required },
    email: { required, email },
    country: { required },
    city: { required },
    address: { required },
    password: { required },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs("password")
    },
    terms: { sameAs: sameAs(() => true) },
    age: { sameAs: sameAs(() => true) }
  },
  watch: {},
  methods: {
    register() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        country: this.country,
        city: this.city,
        address: this.address
      };
      this.$store
        .dispatch("authRegister", user)
        .then(() => {
          this.errors = null;
          this.successRegistration = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 2500);
        })
        .catch(() => {});
      // .catch(error => {
      //   this.errors = error.response.data;
      // });
    },
    getCountries() {
      RequestService.GetCountries()
        .then(response => {
          this.countries = response;
        })
        .catch(() => {});
    },
    checkUsername() {
      clearTimeout(this.debounceUsername);
      this.debounceUsername = setTimeout(() => {
        RequestService.CheckUsername(this.$v.username.$model)
          .then(response => {
            this.availableUsername = !!response.available;
          })
          .catch(() => {});
      }, 1000);
    },
    checkEmail() {
      if (this.$v.email.$invalid) {
        return;
      }
      clearTimeout(this.debounceEmail);
      this.debounceEmail = setTimeout(() => {
        RequestService.CheckEmail({ email: this.$v.email.$model })
          .then(response => {
            this.availableEmail = !!response.available;
          })
          .catch(() => {});
      }, 1000);
    }
  },
  beforeMount() {
    this.getCountries();
  }
};
</script>

<style scoped>
h2 {
  font-size: 18px;
}
.forgot {
  display: flex;
  justify-content: flex-end;
  min-width: 324px;
  align-items: center;
}
.input {
  width: 323px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
::placeholder {
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  padding: 20px;
}
/*.form {*/
/*  padding: 20px 0 72px;*/
/*}*/

label {
  font-size: 10px;
}
</style>
