<template>
  <div style="background-color: #fff" class="form relative-position">
    <form v-on:submit.prevent class="q-pa-md">
      <div class="column items-end">
        <q-btn v-close-popup round dense color="secondary" icon="close" />
      </div>
      <h1 class="text-center">Restaurant hinzufügen</h1>
      <p class="subtitle text-right">(Pflichtfelder *)</p>
      <div class="input input1 q-mt-md">
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
          id="input2"
          type="password"
          v-model="$v.password.$model"
          outlined
          label="Passwort *"
          stack-label
          placeholder="Passwort9754094"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </div>
      <p v-if="$v.password.$dirty && !$v.password.required" class="error">
        Password wird benötigt
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input3"
          type="password"
          v-model="$v.passwordConfirmation.$model"
          outlined
          label="Passwort bestätigen *"
          stack-label
          placeholder="Passwort9754094"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </div>
      <p
        v-if="
          $v.passwordConfirmation.$dirty && !$v.passwordConfirmation.required
        "
        class="error m-0"
      >
        Passwort bestätigen ist erforderlich
      </p>
      <p v-if="!$v.passwordConfirmation.sameAsPassword" class="error">
        Passwörter müssen übereinstimmen
      </p>
      <div class="input input2 q-mt-md">
        <q-input
          id="input9"
          type="text"
          v-model="referral"
          outlined
          label="Referal"
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
          @change="getRestaurantsData()"
          v-model="$v.googleId.$model"
          outlined
          label="Google Places ID *"
          stack-label
          placeholder="ChIJ29wi64B1nkcRR5UyRpxvUm4"
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
      <div class="input input2 q-mt-md">
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
      <div class="input input2 q-mt-md">
        <q-input
          id="input6"
          type="text"
          v-model="$v.restaurantAvatar.$model"
          outlined
          label="Restaurant Avatar"
          stack-label
          placeholder=""
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>
      <p
        v-if="$v.restaurantAvatar.$dirty && !$v.restaurantAvatar.required"
        class="error m-0"
      >
        Restaurant Bild wird benötigt
      </p>

      <div class="input input2 q-mt-md">
        <q-input
          id="input10"
          type="text"
          v-model="$v.restaurantImage.$model"
          outlined
          label="Hintergrund Bild *"
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

      <div class="input input2 q-mt-md">
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

      <img :src="this.restaurantAvatar" alt="" />
      <button @click="register" class="btn text-center full-width">
        Restaurant hinzufügen
      </button>
      <div v-if="successRegistration" class="text-success">
        Restaurant erfolgreich hinzugefügt
      </div>
      <div v-if="errors" class="mt-0 text-red">
        Etwas ist schief gelaufen: {{ errors.message }}
      </div>
      <q-btn
        flat
        class="full-width"
        label="Abbrechen"
        color="secondary"
        v-close-popup
      />
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
      response: null,
      restaurantsData: null,
      restaurantName: null,
      restaurantAvatar: null,
      restaurantAddress: null,
      errors: null,
      successRegistration: false,
      username: null,
      alias: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      googleId: null,
      referral: null,
      availableUsername: null,
      availableEmail: null,
      modalDate: false,
      restaurantImage: null,
      restaurantVoucherName: null,
      restaurantVoucherCode: null
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
  watch: {},
  methods: {
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
        restaurantAddress: this.restaurantAddress,
        restaurantVoucherName: this.restaurantVoucherName,
        restaurantVoucherCode: this.restaurantVoucherCode,
        restaurantImage: this.restaurantImage
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
    },
    getRestaurantsData() {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
      const apiKey = "AIzaSyBNljWVEJJkYtalmgBaG_P1I5ZjviZ8j6A";
      this.$axios
        .get(proxy + url + this.googleId + "&key=" + apiKey)
        .then(response => {
          this.restaurantsData = response;
          this.restaurantName = response.data.result.name;
          this.restaurantAvatar = response.data.result.icon;
          this.restaurantAddress = response.data.result.formatted_address;
          return response;
        })
        .catch(err => {
          console.log(err);
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
  /*
  height: 49px;
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
