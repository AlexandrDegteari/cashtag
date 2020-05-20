<template>
  <main>
    <div class="small-centered-container">
      <form @submit.prevent="submitPasswordForm">
        <div class="row q-pb-md q-pt-xl">
          <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
            <label for="oldPassword">Old Password</label>
            <input
              v-model="$v.passwordForm.currentPassword.$model"
              class="mt-1"
              id="oldPassword"
              type="password"
            />
            <p
              v-if="
                          $v.passwordForm.currentPassword.$dirty &&
                            !$v.passwordForm.currentPassword.required
                        "
              class="error"
            >
              Old Password is required
            </p>
          </div>
          <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
            <label class="mt-2" for="new-password"
            >New Password</label
            >
            <input
              v-model="$v.passwordForm.password.$model"
              class="mt-1"
              id="new-password"
              type="password"
            />
            <p
              v-if="
                          $v.passwordForm.password.$dirty &&
                            !$v.passwordForm.password.required
                        "
              class="error"
            >
              New Password is required
            </p>
          </div>
          <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
            <label class="mt-2" for="passwordConfirmation"
            >New Password Confirmation</label
            >
            <input
              v-model="$v.passwordForm.passwordConfirmation.$model"
              class="mt-1"
              id="passwordConfirmation"
              type="password"
            />
            <p
              v-if="
                          $v.passwordForm.passwordConfirmation.$dirty &&
                            !$v.passwordForm.passwordConfirmation.required
                        "
              class="error"
            >
              Password Confirmation is required
            </p>
            <p
              v-if="
                          !$v.passwordForm.passwordConfirmation.sameAsPassword
                        "
              class="error"
            >
              Passwords must be identical
            </p>
          </div>
          <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
            <input
              class="btn btn-primary mt-3"
              type="submit"
              value="Update Password"
            />
            <p class="text-success ml-3" v-if="passwordMessage">
              {{ passwordMessage }}
            </p>
            <p class="text-danger ml-3" v-if="passwordError">
              {{ passwordError }}
            </p>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";
import UserService from "../services/user.service";

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
      response: null,
      passwordForm: {
        currentPassword: null,
        password: null,
        passwordConfirmation: null
      },
      passwordMessage: null,
      passwordError: null
    };
  },
  validations: {
    passwordForm: {
      currentPassword: { required },
      password: { required },
      passwordConfirmation: { required, sameAsPassword: sameAs("password") }
    }
  },
  methods: {
    submitPasswordForm() {
      this.$v.passwordForm.$touch();
      if (this.$v.passwordForm.$invalid) {
        return;
      }

      const password = {
        current_password: this.passwordForm.currentPassword,
        password: this.passwordForm.password,
        password_confirmation: this.passwordForm.passwordConfirmation
      };

      this.passwordMessage = null;
      this.passwordError = null;

      UserService.UpdatePassword(password)
        .then(response => {
          this.passwordMessage = response.data.message;
        })
        .catch(error => {
          this.passwordError = error.response.data.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
