<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div v-if="response">
          <form class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 black-block mt-3">
                <form
                  v-if="!response.admin"
                  class="q-pt-xl"
                  @submit.prevent="submitProfileForm"
                >
                  <div class="row q-pb-md">
                    <div class="col-md-6 q-pa-sm">
                      <label for="mail">E-mail</label>
                      <input
                        class="mt-1"
                        id="mail"
                        type="text"
                        :value="response.email"
                      />
                    </div>
                    <div class="col-md-6 mt-2  q-pa-sm">
                      <label for="username">Username</label>
                      <input
                        :value="response.username"
                        class="mt-1"
                        id="username"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <label for="input5">Restaurant Name</label>
                        <input
                          id="input5"
                          type="text"
                          v-model="$v.restaurantName.$model"
                          placeholder="Restaurant Name"
                        />
                      </div>
                      <p
                        v-if="
                          $v.restaurantName.$dirty &&
                            !$v.restaurantName.required
                        "
                        class="error m-0"
                      >
                        Restaurant Name required
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <label for="input8">Restaurant Address</label>
                        <input
                          id="input8"
                          type="text"
                          v-model="$v.restaurantAddress.$model"
                          placeholder="Restaurant Address"
                        />
                      </div>
                      <p
                        v-if="
                          $v.restaurantAddress.$dirty &&
                            !$v.restaurantAddress.required
                        "
                        class="error m-0"
                      >
                        Restaurant Address required
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <label class="mt-2 text-uppercase" for="code"
                        >Google Places ID</label
                      >
                      <input
                        class="mt-1"
                        id="code"
                        placeholder="Google Places ID"
                        type="text"
                        v-model="$v.googleId.$model"
                      />

                      <p
                        v-if="$v.googleId.$dirty && !$v.googleId.required"
                        class="error m-0"
                      >
                        Google Id is required
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <label for="input6">Restaurant Avatar</label>
                        <input
                          id="input6"
                          type="text"
                          v-model="$v.restaurantAvatar.$model"
                          placeholder="Restaurant Avatar Address"
                        />
                      </div>
                      <p
                        v-if="
                          $v.restaurantAvatar.$dirty &&
                            !$v.restaurantAvatar.required
                        "
                        class="error m-0"
                      >
                        Restaurant Avatar required
                      </p>
                      <!--                      <img :src="this.restaurantAvatar" alt="" />-->
                    </div>
                    <div
                      class="col-lg-12 q-pa-sm text-right py-0 line-btn-success"
                    >
                      <button
                        @click="submitProfileForm"
                        type="button"
                        class="btn btn-primary ml-2 mb-2"
                      >
                        Update Profile Data
                      </button>
                      <p v-if="this.message" class="text-success">
                        {{ message }}
                      </p>
                    </div>
                  </div>
                </form>
                <form @submit.prevent="submitPasswordForm">
                  <div class="row q-pb-md q-pt-xl">
                    <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
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
                    <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
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
                    <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
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
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import sameAs from "vuelidate/lib/validators/sameAs";
export default {
  mixins: [validationMixin],
  data() {
    return {
      response: null,
      restaurantsData: null,
      restaurantName: null,
      restaurantAvatar: null,
      restaurantAddress: null,
      errors: null,
      successRegistration: false,
      username: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      googleId: null,
      terms: false,
      availableUsername: null,
      availableEmail: null,
      modalDate: false,
      message: null,
      dialogAvatar: false,
      base64: null,
      passwordForm: {
        password: null,
        passwordConfirmation: null
      },
      passwordMessage: null,
      passwordError: null
    };
  },
  validations: {
    googleId: { required },
    restaurantName: { required },
    restaurantAvatar: { required },
    restaurantAddress: { required },
    passwordForm: {
      password: { required },
      passwordConfirmation: { required, sameAsPassword: sameAs("password") }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("authLogout").then(() => {
        this.$router.push("/login");
      });
    },
    submitProfileForm() {
      if (this.$v.$invalid) {
        return;
      }

      const profile = {
        googleId: this.googleId,
        restaurantName: this.restaurantName,
        restaurantAvatar: this.restaurantAvatar,
        restaurantAddress: this.restaurantAddress
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
    },
    submitPasswordForm() {
      this.$v.passwordForm.$touch();
      if (this.$v.passwordForm.$invalid) {
        return;
      }

      const password = {
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
    },
    getUser() {
      UserService.GetUserInfo()
        .then(response => {
          this.response = response;
          this.restaurantName = response.restaurantName;
          this.restaurantAvatar = response.restaurantAvatar;
          this.restaurantAddress = response.restaurantAddress;
          this.googleId = response.googleId;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    this.getUser();
  }
};
</script>
<style lang="scss">
.error {
  margin: 0;
}

.register:disabled {
  color: #757b7b !important;
  cursor: not-allowed;
}

.dialog-avatar {
  padding: 20px;
  background-color: rgba(50, 59, 59, 0.95);
}

#uploadInput {
  display: none;
}
</style>
