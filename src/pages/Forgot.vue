<template>
  <div style="background-color: #fff" class="container q-pa-xl">
    <h1>Forgot Password?</h1>
    <form class="container-fluid" @submit.prevent="submitForm">
      <div class="row black-block p-2 p-md-4 pb-4">
        <div class="col-md-12">
          <p class="text-white no-worries">
            Enter your e-mail address and if the e-mail is registered you will
            receive a reset password code.
          </p>
          <div>
            <label for="mail">E-mail</label>
            <input
              v-model.trim="$v.email.$model"
              class="mt-1"
              id="mail"
              type="text"
              autocomplete="off"
              :disabled="response"
            />
            <span v-if="!$v.email.email" class="error">
              Invalid e-mail address.
            </span>
          </div>
          <div v-if="response" class="reset">
            <div>
              <label for="code">Reset code</label>
              <input
                v-model.trim="$v.code.$model"
                class="mt-1"
                id="code"
                type="text"
                autocomplete="off"
              />
              <span v-if="!$v.code.required" class="error">
                Reset code is required.
              </span>
            </div>
            <div>
              <label for="password">Password</label>
              <input
                v-model.trim="$v.password.$model"
                class="mt-1"
                id="password"
                type="password"
              />
              <span v-if="!$v.password.required" class="error">
                Password is required.
              </span>
            </div>
            <div>
              <label for="confirm">Confirm Password</label>
              <input
                v-model.trim="passwordConfirmation"
                class="mt-1"
                id="confirm"
                type="password"
              />
              <span v-if="!$v.passwordConfirmation.required" class="error">
                Confirm Password is required.
              </span>
              <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
                Passwords must be identical
              </p>
            </div>
          </div>
          <div
            class="d-flex mt-4 pt-2 justify-content-between align-items-center"
          >
            <button
              @click.prevent="submitForm"
              :disabled="formValidation()"
              class="btn btn-primary w-50"
              type="submit"
            >
              {{ getButtonLabel() }}
            </button>
          </div>
          <div v-if="message">
            <p class="text-success">{{ message }}</p>
          </div>
          <div v-if="error">
            <p class="error">{{ error }}</p>
          </div>
          <div v-if="errors" class="mt-0">
            <div v-for="(error, index) in errors" :key="index">
              <p v-for="(item, index) in error" :key="index" class="error mb-0">
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: null,
      password: null,
      passwordConfirmation: null,
      code: null,
      message: null,
      errors: null,
      error: null,
      response: null
    };
  },
  validations: {
    email: { required, email },
    password: { required },
    code: { required },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    formValidation() {
      if (this.response) {
        return this.$v.$invalid;
      } else {
        return this.$v.email.$invalid;
      }
    },
    getButtonLabel() {
      if (this.response) {
        return "Change password";
      } else {
        return "Send recovery e-mail";
      }
    },
    submitForm() {
      if (this.response) {
        if (this.$v.$invalid) return;
        this.message = null;
        this.errors = null;
        this.error = null;
        this.$axios
          .put("https://protected-garden-19195.herokuapp.com/users", {
            email: this.email,
            code: this.code,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          })
          .then(response => {
            if (response.status === 200) {
              this.message = `Password was successfully changed for ${this.email}`;

              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            }
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            } else if (error.response.status === 400) {
              this.error = error.response.data.message;
            }
          });
      } else {
        this.$axios
          .get("https://protected-garden-19195.herokuapp.com/users" + email)
          .then(response => {
            if (response.status === 200) {
              this.response = true;
              this.message = `A password reset code has been sent to ${this.email}`;
            }
          });
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
