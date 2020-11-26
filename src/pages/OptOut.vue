<template>
  <div style="height:50vh" class="container">
    <q-form
      @submit.prevent="deleteContact(phone)"
      ref="form"
      class="q-pa-lg q-mt-xl border-radius-20px bg-white"
    >
      <h2>Unsubscribe form</h2>
      <p>
        If you want to unsubscribe from our messages please enter your phone
        number here:
      </p>
      <q-input
        class="q-pt-md"
        filled
        v-model="phone"
        label="Phone number *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn
        type="submit"
        v-close-popup
        color="primary"
        class="button round q-my-sm"
        >Unsubscribe
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
      phone: null,
      error: null,
      restaurantGuests: null,
      success: null
    };
  },
  beforeMount() {
    this.getRestaurantById();
    this.getAllGuests();
  },
  methods: {
    async getRestaurantById() {
      await UserService.GetUserById(this.$route.params.userId)
        .then(response => {
          this.restaurantGuests = response.restaurantGuests;
          console.log(this.restaurantGuests);
        })
        .catch(() => {});
    },
    async deleteContact(phone) {
      await UserService.GetUserById(this.$route.params.userId)
        .then(response => {
          this.restaurantGuests = response.restaurantGuests;
        })
        .catch(() => {});
      this.restaurantGuests = this.restaurantGuests.filter(
        el => el.phone !== phone
      );
      console.log(this.restaurantGuests);
      const profile = {
        restaurantGuests: this.restaurantGuests
      };

      UserService.UpdateUserProf(profile, this.$route.params.userId)
        .then(() => {
          // console.log("Guest Saved");
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    getAllGuests() {
      UserService.GetUsers()
        .then(response => {
          this.data = response;
          console.log(response);
          this.data = this.data.filter(
            user => user._id === this.$route.params.userId
          );
          this.data = this.data[0].restaurantGuests;
          for (let contact of this.data) {
            this.numbers.push(contact.phone);
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
