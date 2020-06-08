<template>
  <div style="background-color: #fff" class="form relative-position ">
    <form v-on:submit.prevent class="q-pa-md">
      <div class="column items-end">
        <q-btn v-close-popup round dense color="secondary" icon="close" />
      </div>
      <h1 class="text-center">Restaurant bearbeiten</h1>
      <div class="input input1 q-mt-md q-mt-md">
        <q-input
          id="input"
          type="text"
          v-model.trim="$v.username.$model"
          outlined
          label="Manager Name *"
          stack-label
          placeholder="Max Mustermann"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
      <p v-if="$v.username.$dirty && !$v.username.required" class="error">
        Benutzername wird benötigt
      </p>
      <p v-if="availableUsername === false" class="error">
        Benutzername bereits vergeben, bitte wählen Sie einen anderen
      </p>
      <div class="input input3 q-mt-md">
        <q-input
          v-model.trim="$v.email.$model"
          id="input1"
          type="text"
          outlined
          label="E-Mail *"
          stack-label
          placeholder="jemand@beispiel.com"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>
      <p v-if="!$v.email.email" class="error">
        E-mail ist nicht gültig
      </p>
      <p v-if="$v.email.$dirty && !$v.email.required" class="error">
        E-mail wird benötigt
      </p>
      <p v-if="availableEmail === false" class="error">
        Email bereits vergeben, bitte wählen Sie eine andere
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input9"
          type="text"
          v-model="referral"
          outlined
          label="Referal *"
          stack-label
          placeholder="Referal-32"
        >
          <template v-slot:prepend>
            <q-icon name="people" />
          </template>
        </q-input>
      </div>
      <div class="input input2 q-mt-md">
        <q-input
          id="input4"
          type="text"
          v-model="$v.googleId.$model"
          outlined
          label="Google Places ID *"
          stack-label
          placeholder="Passwort9754094"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>
      <p v-if="$v.googleId.$dirty && !$v.googleId.required" class="error m-0">
        Google ID wird benötigt
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input5"
          type="text"
          v-model="$v.restaurantName.$model"
          outlined
          label="Restaurant Name"
          stack-label
          placeholder=""
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantName.$dirty && !$v.restaurantName.required"
        class="error m-0"
      >
        Restaurant Name wird benötigt
      </p>
      <div class="input input2 q-mt-md q-mb-md">
        <q-input
          id="input8"
          type="text"
          v-model="$v.restaurantAddress.$model"
          outlined
          label="Restaurant Adresse"
          stack-label
          placeholder=""
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantAddress.$dirty && !$v.restaurantAddress.required"
        class="error m-0"
      >
        Restaurant Addresse wird benötigt
      </p>

      <div class="column items-center q-mt-xl">
        <img :src="this.restaurantAvatar" alt="" width="100px" />
      </div>
      <div class="input input2 q-mt-md q-mb-md">
        <q-input
          id="input6"
          type="text"
          v-model="$v.restaurantAvatar.$model"
          outlined
          label="Restaurant Logo *"
          stack-label
          placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hofbrauhaus.JPG/1024px-Hofbrauhaus.JPG"
        >
          <template v-slot:prepend>
            <q-icon name="insert_photo" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantAvatar.$dirty && !$v.restaurantAvatar.required"
        class="error m-0"
      >
        Restaurant Logo wird benötigt
      </p>
      <div class="column items-center q-mt-xl">
        <img :src="this.restaurantImage" alt="" width="250px" />
      </div>
      <div class="input input2 q-mt-md q-mb-lg">
        <q-input
          id="input10"
          type="text"
          v-model="$v.restaurantImage.$model"
          outlined
          label="Restaurant Bild *"
          stack-label
          placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hofbrauhaus.JPG/1024px-Hofbrauhaus.JPG"
        >
          <template v-slot:prepend>
            <q-icon name="insert_photo" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantImage.$dirty && !$v.restaurantImage.required"
        class="error m-0"
      >
        Restaurant Bild wird benötigt
      </p>
      <div class="input input2 q-mt-xl">
        <q-input
          id="input12"
          type="text"
          v-model="$v.restaurantVoucherName.$model"
          outlined
          label="Gutschein Name *"
          stack-label
          placeholder="Kaffee Promo"
        >
          <template v-slot:prepend>
            <q-icon name="code" />
          </template>
        </q-input>
      </div>
      <p
        v-if="
          $v.restaurantVoucherName.$dirty && !$v.restaurantVoucherName.required
        "
        class="error m-0"
      >
        Restaurant Gutschein Name wird benötigt
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input13"
          type="text"
          v-model="$v.restaurantVoucherCode.$model"
          outlined
          label="Gutschein Code *"
          stack-label
          placeholder="kaffee-promo"
        >
          <template v-slot:prepend>
            <q-icon name="code" />
          </template>
        </q-input>
      </div>
      <p
        v-if="
          $v.restaurantVoucherCode.$dirty && !$v.restaurantVoucherCode.required
        "
        class="error m-0"
      >
        Restaurant Gutschein Code wird benötigt
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input16"
          type="text"
          v-model="$v.restaurantVoucherCode.$model"
          outlined
          label="Gutschein Code *"
          stack-label
          placeholder="kaffee-promo"
        >
          <template v-slot:prepend>
            <q-icon name="code" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantChat.$dirty && !$v.restaurantChat.required"
        class="error m-0"
      >
        Restaurant Gutschein Code wird benötigt
      </p>
      <button
        @click.stop="submitProfileForm()"
        class="btn text-center full-width"
      >
        Daten aktualisieren
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
      <q-btn
        flat
        class="full-width"
        label="Abbrechen"
        color="secondary"
        v-close-popup
      />
    </form>
    <form @submit.prevent="submitPasswordForm" class="q-pa-md">
      <div class="row q-pb-md q-pt-xl">
        <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
          <q-input
            v-model="$v.password.$model"
            class="mt-1"
            id="new-password"
            type="password"
            outlined
            label="Neues Passwort"
            stack-label
            placeholder="Passwort9754094"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <p v-if="$v.password.$dirty && !$v.password.required" class="error">
            Neues Passwort wird benötigt
          </p>
        </div>
        <div class="col-md-12 q-pa-sm pl-md-0 mt-2 q-pa-sm">
          <q-input
            v-model="$v.passwordConfirmation.$model"
            class="mt-1"
            id="passwordConfirmation"
            type="password"
            outlined
            label="Neues Passwort bestätigen"
            stack-label
            placeholder="Passwort9754094"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <p
            v-if="
              $v.passwordConfirmation.$dirty &&
                !$v.passwordConfirmation.required
            "
            class="error"
          >
            Passwort bestätigen ist erforderlich
          </p>
          <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
            Passwörter müssen übereinstimmen
          </p>
        </div>
        <div class="col-md-12 q-pa-sm">
          <button
            @click.stop="submitPasswordForm"
            class="btn text-center full-width"
          >
            Passwort aktualisieren
          </button>
          <p class="text-success ml-3" v-if="passwordMessage">
            {{ passwordMessage }}
          </p>
          <p class="text-danger ml-3" v-if="passwordError">
            {{ passwordError }}
          </p>
        </div>
        <q-btn
          flat
          class="full-width"
          label="Abbrechen"
          color="secondary"
          v-close-popup
        />
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
  methods: {
    submitPasswordForm() {
      // this.$v.passwordForm.$touch();
      // if (this.$v.passwordForm.$invalid) {
      //   return;
      // }

      const password = {
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };

      this.passwordMessage = null;
      this.passwordError = null;

      UserService.UpdateUserPass(password, this.userId)
        .then(() => {
          this.passwordMessage = "Das Passwort wurde erfolgreich aktualisiert";
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
        userId: this.userId,
        username: this.username,
        referral: this.referral
      };

      this.message = null;

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {
          this.$emit("updatedForm");
          this.message = "Das Profil wurde erfolgreich aktualisiert";
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    }
  }
};
</script>

<style scoped>
.input {
  /*width: 100%;*/
  /*height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  */
}

form {
  /*
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  padding: 20px;
  */
}
</style>
