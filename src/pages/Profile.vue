<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="bg">
          <form class="container-fluid">
            <div class="row mt-3 justify-content-center">
              <div class="col-lg-6 pb-3">
                <h1>Profile Page</h1>
                <div v-if="restaurantData" class="row">
                  <ul>
                    <li>
                      <span>Manager Name: {{ restaurantData.username }}</span>
                    </li>
                    <li>
                      <span>Manager Email: {{ restaurantData.email }}</span>
                    </li>
                    <li>
                      <span
                        >Created Date: {{ restaurantData.createdDate }}</span
                      >
                    </li>
                    <li>
                      <span>Google ID: {{ restaurantData.googleId }}</span>
                    </li>

                    <li>
                      <span
                        >Restaurant Name:
                        {{ restaurantData.restaurantName }}</span
                      >
                    </li>
                    <li>
                      <span
                        >Restaurant Address:
                        {{ restaurantData.restaurantAddress }}</span
                      >
                      <span></span>
                    </li>
                    <li>
                      <span
                        >Restaurant Avatar:
                        {{ restaurantData.restaurantAvatar }}</span
                      >
                      <img :src="restaurantData.restaurantAvatar" alt="" />
                    </li>
                  </ul>
                </div>
                <br />
                <h2>Change password</h2>
                <form @submit.prevent="submitPasswordForm">
                  <div class="row black-block">
                    <div class="col-md-12 pl-md-0  mt-2">
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
                        v-if="
                          !$v.passwordForm.passwordConfirmation.sameAsPassword
                        "
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
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      response: null,
      restaurantData: null,
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
    getCurrentRestaurantData() {
      this.$axios
        .get("http://localhost:4000/users/current")
        .then(response => {
          this.restaurantData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitPasswordForm() {
      this.$v.passwordForm.$touch();
      if (this.$v.passwordForm.$invalid) {
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const password = {
        current_password: this.passwordForm.currentPassword,
        password: this.passwordForm.password,
        password_confirmation: this.passwordForm.passwordConfirmation
      };

      this.passwordMessage = null;
      this.passwordError = null;
    },
    readImage(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64 = reader.result;
      };
      if (e.target.files.length) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  },
  beforeMount() {
    this.getCurrentRestaurantData();
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
