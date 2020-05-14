<template>
  <div>
    <form class="container-fluid">
      <div class="row">
        <div class="col-xl col-lg-12 col-md-12 black-block mt-3">
          <profile-form :user="response" @updatedForm="getUser" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-lg-6 pb-3">
          <form @submit.prevent="submitPasswordForm">
            <div class="row black-block">
              <div class="col-md-6 mt-2">
                <label for="mail">E-mail</label>
                <input
                  class="mt-1"
                  id="mail"
                  type="text"
                  :value="response.email"
                  disabled
                />
              </div>
              <div class="col-md-6 pl-md-0  mt-2">
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

                <label class="mt-2" for="new-password">New Password</label>
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

                <label class="mt-2" for="passwordConfirmation"
                  >Password Confirmation</label
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
                  v-if="!$v.passwordForm.passwordConfirmation.sameAsPassword"
                  class="error"
                >
                  Passwords must be identical
                </p>
              </div>
              <div class="col-lg-12 text-right pl-md-0 my-0">
                <input
                  class="btn btn-primary ml-2 mb-2 mt-2"
                  type="submit"
                  value="update"
                />
              </div>
              <p class="text-success ml-3" v-if="passwordMessage">
                {{ passwordMessage }}
              </p>
              <p class="text-danger ml-3" v-if="passwordError">
                {{ passwordError }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </form>
    <button @click="logout" class="btn btn-primary ml-2 mb-2" type="button">
      Log out
    </button>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { validationMixin } from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";

import ProfileForm from "./ProfileForm";

export default {
  mixins: [validationMixin],
  components: {
    ProfileForm
  },
  data() {
    return {
      response: null,
      dialogAvatar: false,
      avatar: null,
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
    avatar: { required },
    passwordForm: {
      currentPassword: { required },
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
          this.avatar = response.avatar;
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
          this.avatar = response.avatar;
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
