<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div v-if="response">
          <form class="container">
            <div class="row">
              <!--              <div-->
              <!--                class="col-lg col-md-12 upload-images-container mt-3 pl-0 d-flex"-->
              <!--              >-->
              <!--                <div class="black-block w-100">-->
              <!--                  <div class="upload-images">-->
              <!--                    <img :src="this.restaurantAvatar" alt="" />-->
              <!--                  </div>-->
              <!--                  <span @click.stop="dialogAvatar = true" class="open-modal">-->
              <!--                    EDIT picture-->
              <!--                  </span>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="col-lg-12 col-md-12 black-block mt-3">
                <form class="q-pt-xl" @submit.prevent="submitProfileForm">
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
                <!--                <form @submit.prevent="submitPasswordForm">-->
                <!--                  <div class="row q-pb-md q-pt-xl">-->
                <!--                    <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">-->
                <!--                      <label for="oldPassword">Old Password</label>-->
                <!--                      <input-->
                <!--                        v-model="$v.passwordForm.currentPassword.$model"-->
                <!--                        class="mt-1"-->
                <!--                        id="oldPassword"-->
                <!--                        type="password"-->
                <!--                      />-->
                <!--                      <p-->
                <!--                        v-if="-->
                <!--                          $v.passwordForm.currentPassword.$dirty &&-->
                <!--                            !$v.passwordForm.currentPassword.required-->
                <!--                        "-->
                <!--                        class="error"-->
                <!--                      >-->
                <!--                        Old Password is required-->
                <!--                      </p>-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                  <div class="row q-pb-md">-->
                <!--                    <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">-->
                <!--                      <label class="mt-2" for="new-password"-->
                <!--                        >New Password</label-->
                <!--                      >-->
                <!--                      <input-->
                <!--                        v-model="$v.passwordForm.password.$model"-->
                <!--                        class="mt-1"-->
                <!--                        id="new-password"-->
                <!--                        type="password"-->
                <!--                      />-->
                <!--                      <p-->
                <!--                        v-if="-->
                <!--                          $v.passwordForm.password.$dirty &&-->
                <!--                            !$v.passwordForm.password.required-->
                <!--                        "-->
                <!--                        class="error"-->
                <!--                      >-->
                <!--                        New Password is required-->
                <!--                      </p>-->
                <!--                    </div>-->
                <!--                    <div class="col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">-->
                <!--                      <label class="mt-2" for="passwordConfirmation"-->
                <!--                        >New Password Confirmation</label-->
                <!--                      >-->
                <!--                      <input-->
                <!--                        v-model="$v.passwordForm.passwordConfirmation.$model"-->
                <!--                        class="mt-1"-->
                <!--                        id="passwordConfirmation"-->
                <!--                        type="password"-->
                <!--                      />-->
                <!--                      <p-->
                <!--                        v-if="-->
                <!--                          $v.passwordForm.passwordConfirmation.$dirty &&-->
                <!--                            !$v.passwordForm.passwordConfirmation.required-->
                <!--                        "-->
                <!--                        class="error"-->
                <!--                      >-->
                <!--                        Password Confirmation is required-->
                <!--                      </p>-->
                <!--                      <p-->
                <!--                        v-if="-->
                <!--                          !$v.passwordForm.passwordConfirmation.sameAsPassword-->
                <!--                        "-->
                <!--                        class="error"-->
                <!--                      >-->
                <!--                        Passwords must be identical-->
                <!--                      </p>-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                  <div class="row q-pb-md">-->
                <!--                    <div class="col-lg-6 q-pa-sm text-right">-->
                <!--                      <input-->
                <!--                        class="btn btn-primary ml-2 mb-2 mt-2"-->
                <!--                        type="submit"-->
                <!--                        value="Update Password"-->
                <!--                      />-->
                <!--                    </div>-->
                <!--                    <p class="text-success ml-3" v-if="passwordMessage">-->
                <!--                      {{ passwordMessage }}-->
                <!--                    </p>-->
                <!--                    <p class="text-danger ml-3" v-if="passwordError">-->
                <!--                      {{ passwordError }}-->
                <!--                    </p>-->
                <!--                  </div>-->
                <!--                </form>-->
              </div>
            </div>
          </form>
          <!--          <q-dialog v-model="dialogAvatar" max-width="300">-->
          <!--            <div class="dialog-avatar">-->
          <!--              <div class="text-center mb-3">-->
          <!--                <label for="uploadInput" class="btn btn-primary upload-photo">-->
          <!--                  SELECT FILE-->
          <!--                </label>-->
          <!--                <input-->
          <!--                  @change="readImage"-->
          <!--                  type="file"-->
          <!--                  id="uploadInput"-->
          <!--                  value="SELECT FILES"-->
          <!--                  accept="image/png, image/jpeg"-->
          <!--                />-->
          <!--              </div>-->
          <!--              <q-avatar-->
          <!--                :src="base64 ? base64 : this.restaurantAvatar"-->
          <!--                max-height="250"-->
          <!--                contain-->
          <!--              />-->
          <!--              <div class="d-flex justify-content-between mt-3">-->
          <!--                <button-->
          <!--                  @click="updateAvatar()"-->
          <!--                  :disabled="!base64"-->
          <!--                  class="upload-result btn btn-primary pl-4 pr-4"-->
          <!--                >-->
          <!--                  SAVE-->
          <!--                </button>-->
          <!--                <button-->
          <!--                  @click="dialogAvatar = false"-->
          <!--                  class="btn btn-primary"-->
          <!--                  type="button"-->
          <!--                >-->
          <!--                  ok-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </q-dialog>-->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
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
        currentPassword: null,
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
    restaurantAddress: { required }
    // passwordForm: {
    //   currentPassword: { required },
    //   password: { required },
    //   passwordConfirmation: { required, sameAsPassword: sameAs("password") }
    // }
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
    },
    readImage(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64 = reader.result;
      };
      if (e.target.files.length) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    updateAvatar() {
      if (!this.base64) return;
      UserService.UpdateAvatar({ imagebase64: this.base64 })
        .then(response => {
          this.avatar = response.restaurantAvatar;
          this.base64 = null;
        })
        .catch(error => {
          console.log(error);
        });
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
