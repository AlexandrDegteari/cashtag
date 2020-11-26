<template>
  <div style="width: 600px; max-width: 80vw;" class="bg-white">
    <q-form
      @submit.prevent="sendSms(formData)"
      ref="form"
      class="q-pa-lg q-mb-xl border-radius-20px bg-white"
    >
      <div class="text-right q-py-md">
        <span>* Required</span>
      </div>
      <div v-if="!sent">
        <q-input
          filled
          v-model="formData.sender_id"
          label="Name *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="formData.to"
          label="Phone Number *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-if="numbers"
          type="textarea"
          filled
          v-model="formData.message"
          label="Your message *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-toggle
          v-if="!numbers"
          v-model="acceptSms"
          required
          label="Accept send sms with offers on this number *"
        />
        <q-toggle
          v-if="!numbers"
          required
          v-model="acceptTerms"
          label="Accept Terms of Service *"
        />
        <br />
        <q-btn
          v-if="!numbers"
          color="primary"
          :disabled="!acceptSms || !acceptTerms"
          type="submit"
          class="button round q-my-sm"
          >Send
        </q-btn>
        <q-btn
          v-if="numbers"
          color="primary"
          type="submit"
          class="button round q-my-sm"
          >Send Promo
        </q-btn>
      </div>
      <q-input
        v-if="sent"
        filled
        v-model="enteredCode"
        label="Code *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn
        v-if="sent"
        @click="sent = false"
        color="primary"
        type="submit"
        class="button round q-my-sm q-mr-sm"
        v-close-popup
        >Send SMS Again
      </q-btn>
      <q-btn
        v-if="sent && reviews"
        :to="{
          name: 'voucher',
          params: {
            premium: false
          }
        }"
        exact
        tag="li"
        active-class="active"
        :disabled="code !== parseInt(enteredCode)"
        @click="voucherCounter"
        v-close-popup
        color="primary"
        class="button round q-my-sm"
        >Geschenk abholen
      </q-btn>
      <q-btn
        v-if="sent && !reviews"
        :to="{
          name: 'voucher',
          params: {
            premium: true
          }
        }"
        exact
        tag="li"
        active-class="active"
        :disabled="code !== parseInt(enteredCode)"
        @click="saveGuest"
        v-close-popup
        color="primary"
        class="button round q-my-sm"
        >Become Premium
      </q-btn>
      <span class="text-red">{{ error }}</span>
      <span class="text-green-5">{{ success }}</span>
    </q-form>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "ContactForm",
  props: ["reviews", "numbers"],
  data() {
    return {
      code: null,
      error: null,
      enteredCode: null,
      acceptSms: false,
      restaurantGuests: [],
      acceptTerms: false,
      sent: false,
      success: null,
      userId: this.$route.params.userId,
      formData: {
        sender_id: null,
        to: this.numbers ? this.numbers : "+49",
        message: `If you dont want to get messages anymore please follow this link: https://dev.cashtag.appflex.dev/#/optout/${this.$route.params.userId}`,
        callback_url: "https://sms.to/callback/handler"
      }
    };
  },
  beforeMount() {
    this.getRestaurantById();
  },
  methods: {
    // notify(message) {
    //   this.$q.notify({
    //     message: message,
    //     color: 'primary',
    //     multiLine: true,
    //   })
    voucherCounter() {
      const guest = {
        name: this.formData.sender_id,
        phone: this.formData.to
      };
      this.restaurantGuests.push(guest);
      const profile = {
        restaurantGuests: this.restaurantGuests,
        restaurantVoucherCounter: this.restaurantVoucherCounter
          ? this.restaurantVoucherCounter + 1
          : 1
      };
      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {})
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    saveGuest() {
      const guest = {
        name: this.formData.sender_id,
        phone: this.formData.to
      };
      this.restaurantGuests.push(guest);
      const profile = {
        restaurantGuests: this.restaurantGuests
      };

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {})
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    async getRestaurantById() {
      await UserService.GetUserById(this.userId)
        .then(response => {
          this.restaurantGuests = response.restaurantGuests;
          this.restaurantVoucherCounter = response.restaurantVoucherCounter;
          this.formData.sender_id = response.restaurantName;
        })
        .catch(() => {});
    },
    async sendSms(formData) {
      this.error = null;
      if (!this.restaurantGuests.some(e => e.phone === formData.to)) {
        this.success = "Message with code sent successful";
      } else {
        if (!this.numbers) {
          this.error = formData.to + " exist";
          return;
        }
      }
      if (!this.numbers) {
        this.code = Math.floor(Math.random() * (9000 - 1000)) + 1000;
        this.formData.message = "Your code is " + this.code;
      }
      await UserService.SendSms(formData)
        .then(() => {
          // this.notify("Success");
          if (!this.numbers) {
            this.sent = true;
            this.success = null;
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
          }
        })
        .catch(error => {
          // this.notify("Error");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
