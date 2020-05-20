<template>
  <div style="background-color: #fff" class="form relative-position ">
    <form v-on:submit.prevent>
      <h1>Edit Restaurant Data</h1>
      <div class="input input1 q-mt-md q-mb-md">
        <input
          id="input"
          type="text"
          v-model.trim="$v.username.$model"
          placeholder="Manager Name"
        />
        <label for="input"></label>
      </div>
      <p v-if="$v.username.$dirty && !$v.username.required" class="error">
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
          id="input9"
          type="text"
          v-model="referral"
          placeholder="Referral"
        />
        <label for="input9"></label>
      </div>
      <div class="input input2 q-mb-md">
        <input
          id="input4"
          type="text"
          v-model="$v.googleId.$model"
          placeholder="Google Places ID"
        />
        <label for="input4"></label>
      </div>
      <p v-if="$v.googleId.$dirty && !$v.googleId.required" class="error m-0">
        Google Id is required
      </p>
      <div class="input input2 q-mb-md">
        <input
          id="input5"
          type="text"
          v-model="$v.restaurantName.$model"
          placeholder="Restaurant Name"
        />
        <label for="input5"></label>
      </div>
      <p
        v-if="$v.restaurantName.$dirty && !$v.restaurantName.required"
        class="error m-0"
      >
        Restaurant Name required
      </p>
      <div class="input input2 q-mb-md">
        <input
          id="input8"
          type="text"
          v-model="$v.restaurantAddress.$model"
          placeholder="Restaurant Address"
        />
        <label for="input8"></label>
      </div>
      <p
        v-if="$v.restaurantAddress.$dirty && !$v.restaurantAddress.required"
        class="error m-0"
      >
        Restaurant Address required
      </p>
      <div class="input input2 q-mb-md">
        <input
          id="input6"
          type="text"
          v-model="$v.restaurantAvatar.$model"
          placeholder="Restaurant Avatar"
        />
        <label for="input6"></label>
      </div>
      <p
        v-if="$v.restaurantAvatar.$dirty && !$v.restaurantAvatar.required"
        class="error m-0"
      >
        Restaurant Avatar required
      </p>
      <img :src="this.restaurantAvatar" alt="" />
      <button @click="register" class="btn text-center w-100">
        Update Data
      </button>
      <div v-if="successRegistration" class="text-success">
        Data updated successful.
      </div>
      <div class="q-pt-lg">
        <div class="input input2 q-mb-md">
          <input
            id="input2"
            type="password"
            v-model="$v.password.$model"
            placeholder="Change Password"
          />
          <label for="input2"></label>
        </div>
        <p v-if="$v.password.$dirty && !$v.password.required" class="error">
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
            $v.passwordConfirmation.$dirty && !$v.passwordConfirmation.required
          "
          class="error m-0"
        >
          Confirm Password is required
        </p>
        <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
          Passwords must be identical
        </p>
      </div>
      <button @click="submitPasswordForm" class="btn text-center w-100">
        Update Password
      </button>
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
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required, sameAs } from "vuelidate/lib/validators";
import UserService from "../services/user.service";

export default {
  mixins: [validationMixin],
  props: ["restaurant"],
  data() {
    return {
      response: null,
      restaurantsData: null,
      restaurantName: this.restaurant.restaurantName,
      restaurantAvatar: this.restaurant.restaurantAvatar,
      restaurantAddress: this.restaurant.restaurantAddress,
      errors: null,
      successRegistration: false,
      username: this.restaurant.username,
      alias: null,
      email: this.restaurant.email,
      password: null,
      passwordConfirmation: null,
      googleId: this.restaurant.googleId,
      referral: this.restaurant.referral,
      availableUsername: null,
      availableEmail: null,
      modalDate: false
    };
  },
  validations: {
    username: { required },
    email: { required, email },
    googleId: { required },
    restaurantName: { required },
    restaurantAvatar: { required },
    restaurantAddress: { required },
    password: { required },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  mounted() {
    console.log(this.restaurant.googleId);
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
    },

    register() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        googleId: this.googleId,
        referral: this.referral,
        restaurantName: this.restaurantName,
        restaurantAvatar: this.restaurantAvatar,
        restaurantAddress: this.restaurantAddress
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
        .catch(error => {
          this.errors = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 18px;
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

label {
  font-size: 10px;
}
</style>
