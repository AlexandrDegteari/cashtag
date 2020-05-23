<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div v-if="response">
          <form class="container">
            <h1 class="text-center">Profil</h1>
            <div class="row">
              <div class="col-lg-12 col-md-12 black-block mt-3">
                <form
                  v-if="!response.admin"
                  class="q-pt-xl"
                  @submit.prevent="submitProfileForm"
                >
                  <div class="row q-pb-md">
                    <div class="col-md-6 q-pa-sm">
                      <q-input
                        class="mt-1"
                        id="mail"
                        type="text"
                        :value="response.email"
                        outlined
                        disabled
                        readonly
                        label="E-Mail"
                        stack-label
                      >
                        <template v-slot:prepend>
                          <q-icon name="mail" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-6 mt-2  q-pa-sm">
                      <q-input
                        :value="response.username"
                        class="mt-1"
                        id="username"
                        type="text"
                        disabled
                        readonly
                        outlined
                        label="Manager Name"
                        stack-label
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <q-input
                          id="input5"
                          type="text"
                          v-model="$v.restaurantName.$model"
                          outlined
                          disabled
                          readonly
                          label="Restaurant Name"
                          stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="place" />
                          </template>
                        </q-input>
                      </div>
                      <p
                        v-if="
                          $v.restaurantName.$dirty &&
                            !$v.restaurantName.required
                        "
                        class="error m-0"
                      >
                        Restaurant Name wird benötigt
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <q-input
                          id="input8"
                          type="text"
                          v-model="$v.restaurantAddress.$model"
                          outlined
                          disabled
                          readonly
                          label="Restaurant Adresse"
                          stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="place" />
                          </template>
                        </q-input>
                      </div>
                      <p
                        v-if="
                          $v.restaurantAddress.$dirty &&
                            !$v.restaurantAddress.required
                        "
                        class="error m-0"
                      >
                        Restaurant Addresse wird benötigt
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <q-input
                        class="mt-1"
                        id="code"
                        type="text"
                        v-model="$v.googleId.$model"
                        outlined
                        disabled
                        readonly
                        label="Google Places ID"
                        stack-label
                      >
                        <template v-slot:prepend>
                          <q-icon name="place" />
                        </template>
                      </q-input>

                      <p
                        v-if="$v.googleId.$dirty && !$v.googleId.required"
                        class="error m-0"
                      >
                        Google ID wird benötigt
                      </p>
                    </div>
                    <div class="col-md-6 mt-2 q-pa-sm">
                      <div class="input input2 q-mb-md">
                        <q-input
                          id="input6"
                          type="text"
                          v-model="$v.restaurantAvatar.$model"
                          outlined
                          disabled
                          readonly
                          label="Restaurant Avatar"
                          stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="place" />
                          </template>
                        </q-input>
                      </div>
                      <p
                        v-if="
                          $v.restaurantAvatar.$dirty &&
                            !$v.restaurantAvatar.required
                        "
                        class="error m-0"
                      >
                        Restaurant Avatar wird benötigt
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
                        Profil aktualisieren
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
                      <q-input
                        v-model="$v.passwordForm.password.$model"
                        class="mt-1"
                        id="new-password"
                        type="password"
                        outlined
                        label="Neues Passwort"
                        stack-label
                      >
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>
                      <p
                        v-if="
                          $v.passwordForm.password.$dirty &&
                            !$v.passwordForm.password.required
                        "
                        class="error"
                      >
                        Neues Passwort wird benötigt
                      </p>
                    </div>
                    <div class="col-12 col-md-6 q-pa-sm pl-md-0 mt-2 q-pa-sm">
                      <q-input
                        v-model="$v.passwordForm.passwordConfirmation.$model"
                        class="mt-1"
                        id="passwordConfirmation"
                        type="password"
                        outlined
                        label="Neues Passwort bestätigen"
                        stack-label
                      >
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>
                      <p
                        v-if="
                          $v.passwordForm.passwordConfirmation.$dirty &&
                            !$v.passwordForm.passwordConfirmation.required
                        "
                        class="error"
                      >
                        Passwort bestätigen ist erforderlich
                      </p>
                      <p
                        v-if="
                          !$v.passwordForm.passwordConfirmation.sameAsPassword
                        "
                        class="error"
                      >
                        Passwörter müssen übereinstimmen
                      </p>
                    </div>
                    <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
                      <input
                        class="btn btn-primary mt-3"
                        type="submit"
                        value="Passwort aktualisieren"
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
      // if (this.$v.$invalid) {
      //   return;
      // }

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
