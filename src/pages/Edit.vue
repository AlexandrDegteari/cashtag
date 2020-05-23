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
          id="input10"
          type="text"
          v-model="$v.restaurantImage.$model"
          placeholder="Restaurant Image"
        />
        <label for="input10"></label>
      </div>
      <p
        v-if="$v.restaurantImage.$dirty && !$v.restaurantImage.required"
        class="error m-0"
      >
        Restaurant Review Image required
      </p>
      <div class="input input2 q-mb-md">
        <input
          id="input12"
          type="text"
          v-model="$v.restaurantVoucherName.$model"
          placeholder="Restaurant Voucher Name"
        />
        <label for="input12"></label>
      </div>
      <p
        v-if="
          $v.restaurantVoucherName.$dirty && !$v.restaurantVoucherName.required
        "
        class="error m-0"
      >
        Restaurant Voucher Name required
      </p>
      <div class="input input2 q-mb-md">
        <input
          id="input13"
          type="text"
          v-model="$v.restaurantVoucherCode.$model"
          placeholder="Restaurant Voucher Code"
        />
        <label for="input13"></label>
      </div>
      <p
        v-if="
          $v.restaurantVoucherCode.$dirty && !$v.restaurantVoucherCode.required
        "
        class="error m-0"
      >
        Restaurant Voucher Code required
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
      <button @click.stop="submitProfileForm()" class="btn text-center w-100">
        Update Data
      </button>
      <div v-if="this.message" class="text-success">
        {{ message }}
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
    <form @submit.prevent="submitPasswordForm">
      <div class="row q-pb-md q-pt-xl">
        <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
          <label class="mt-2" for="new-password">New Password</label>
          <input
            v-model="$v.password.$model"
            class="mt-1"
            id="new-password"
            type="password"
          />
          <p v-if="$v.password.$dirty && !$v.password.required" class="error">
            New Password is required
          </p>
        </div>
        <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
          <label class="mt-2" for="passwordConfirmation"
            >New Password Confirmation</label
          >
          <input
            v-model="$v.passwordConfirmation.$model"
            class="mt-1"
            id="passwordConfirmation"
            type="password"
          />
          <p
            v-if="
              $v.passwordConfirmation.$dirty &&
                !$v.passwordConfirmation.required
            "
            class="error"
          >
            Password Confirmation is required
          </p>
          <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
            Passwords must be identical
          </p>
        </div>
        <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
          <button
            @click.stop="submitPasswordForm"
            class="btn text-center w-100"
          >
            Update Password
          </button>
          <p class="text-success ml-3" v-if="passwordMessage">
            {{ passwordMessage }}
          </p>
          <p class="text-danger ml-3" v-if="passwordError">
            {{ passwordError }}
          </p>
        </div>
        <div v-if="this.passwordMessage" class="text-success">
          {{ passwordMessage }}
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
      restaurantImage: this.restaurant.restaurantImage,
      restaurantVoucherName: this.restaurant.restaurantVoucherName,
      restaurantVoucherCode: this.restaurant.restaurantVoucherCode,
      userId: this.restaurant.id,
      errors: null,
      successRegistration: false,
      username: this.restaurant.username,
      alias: null,
      email: this.restaurant.email,
      googleId: this.restaurant.googleId,
      referral: this.restaurant.referral,
      availableUsername: null,
      availableEmail: null,
      modalDate: false,
      message: null,
      password: null,
      passwordConfirmation: null,
      passwordMessage: null,
      passwordError: null
    };
  },
  validations: {
    username: { required },
    email: { required, email },
    googleId: { required },
    restaurantName: { required },
    restaurantAvatar: { required },
    restaurantAddress: { required },
    restaurantImage: { required },
    restaurantVoucherName: { required },
    restaurantVoucherCode: { required },
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
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };

      this.passwordMessage = null;
      this.passwordError = null;

      UserService.UpdateUserPass(password, this.userId)
        .then(response => {
          this.passwordMessage = "The profile has been successfully updated.";
          return response;
        })
        .catch(error => {
          this.passwordError = error.response.data.message;
        });
    },

    submitProfileForm() {
      const profile = {
        googleId: this.googleId,
        restaurantName: this.restaurantName,
        restaurantAvatar: this.restaurantAvatar,
        restaurantAddress: this.restaurantAddress,
        restaurantVoucherName: this.restaurantVoucherName,
        restaurantVoucherCode: this.restaurantVoucherCode,
        restaurantImage: this.restaurantImage,
        userId: this.userId
      };

      this.message = null;

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {
          this.$emit("updatedForm");
          this.message = "The profile has been successfully updated.";
        })
        .catch(error => {
          console.log(error.error.response.data);
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
  width: 100%;
  /*height: 49px;*/
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
  padding: 0 40px;
}

label {
  font-size: 10px;
}
</style>
