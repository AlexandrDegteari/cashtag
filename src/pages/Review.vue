<template>
  <div>
    <div>
      <div class="column items-center q-pa-md restaurant-header">
        <div class="col">
          <img :src="this.restaurantAvatar" alt="" class="restaurant-logo" />
        </div>
      </div>
      <div class="q-col-gutter-md row items-start">
        <div class="col-12 container-fluid">
          <q-img :src="this.restaurantImage">
            <div class=" absolute-full text-subtitle2 column flex flex-center">
              <p></p>
              <div class="welcome-2019 text-center">
                <h2>Sichere dir jetzt dein Geschenk</h2>
              </div>
              <div>
                <a
                  v-if="!reviews"
                  target="_blank"
                  :href="
                    'https://search.google.com/local/writereview?placeid=' +
                      this.googleId
                  "
                >
                  <button class="btn btn-review" @click="makeReview">
                    Jetzt bewerten
                  </button>
                </a>
              </div>
              <div class="subtitle text-center">
                <b>
                  1. Beim Bewerten öffnet sich ein neuer Tab.<br />
                  2. Nach der Bewertung neu geöffneten Tab schließen und wieder
                  diesen hier öffnen.
                </b>
              </div>
              <div class="q-mt-xl column flex-center" v-if="!reviews">
                <p>Dont have google account? Become a premium user!</p>
                <button class="btn btn-review" @click="sms = true">
                  Become Premium
                </button>
              </div>
            </div>
          </q-img>
        </div>
      </div>
      <div class="wrapper">
        <main>
          <div class="bg-voucher">
            <div class="container text-center q-pt-sm q-pb-sm">
              <h1>
                {{ restaurantName }}
              </h1>
            </div>
          </div>

          <div class="container q-pt-xl">
            <h2 class="text-center">So funktioniert es:</h2>
            <div class="q-pa-xl">
              <div class="row q-pb-xl items-center">
                <div class="col-4">
                  <q-img src="~assets/icons/first.svg" width="5rem" />
                </div>
                <div class="col-8">
                  <p>1. Scanne den QR-Code</p>
                </div>
              </div>

              <div class="row q-pb-xl items-center">
                <div class="col-4">
                  <q-img src="~assets/icons/second.svg" width="5rem" />
                </div>
                <div class="col-8">
                  <p>
                    2: Bewerte unser Geschäft online und erhalte den Gutschein
                  </p>
                </div>
              </div>

              <div class="row q-pb-xl items-center">
                <div class="col-4">
                  <q-img src="~assets/icons/third.svg" width="5rem" />
                </div>
                <div class="col-8">
                  <p>
                    3: Komme nach der Bewertung zurück auf diese Seite und zeige
                    den Gutschein vor
                  </p>
                </div>
              </div>
            </div>
          </div>
          <q-dialog persistent v-model="sms">
            <ContactForm :reviews="reviews" />
          </q-dialog>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import ContactForm from "./ContactForm";

export default {
  components: { ContactForm },
  data() {
    return {
      restaurantData: this.restaurantData,
      restaurantName: this.restaurantName,
      restaurantAvatar: this.restaurantAvatar,
      reviews: false,
      googleId: this.$route.params.googleId,
      restaurantImage: this.restaurantImage,
      restaurantReviewCounter: this.restaurantReviewCounter,
      restaurantVoucherCounter: this.restaurantVoucherCounter,
      userId: this.$route.params.userId,
      login: localStorage.getItem("user"),
      sms: false
    };
  },
  methods: {
    makeReview() {
      this.getRestaurantById(this.userId);
      this.counter();
      setTimeout(() => {
        this.showVoucher();
      }, 3000);
    },
    showVoucher() {
      this.reviews = true;
      this.sms = true;
    },
    counter() {
      const profile = {
        restaurantReviewCounter: this.restaurantReviewCounter
          ? this.restaurantReviewCounter + 1
          : 1
      };

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {
          this.$emit("updatedForm");
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    getRestaurantById(userId) {
      UserService.GetUserById(userId)
        .then(response => {
          this.restaurantName = response.restaurantName;
          this.restaurantAvatar = response.restaurantAvatar;
          this.restaurantAddress = response.restaurantAddress;
          this.restaurantImage = response.restaurantImage;
          this.restaurantReviewCounter = response.restaurantReviewCounter;
          this.restaurantVoucherCounter = response.restaurantVoucherCounter;
          this.restaurantVoucherName = response.restaurantVoucherName;
          this.restaurantVoucherCode = response.restaurantVoucherCode;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    this.getRestaurantById(this.userId);
  }
};
</script>

<style scoped>
.column {
  flex-direction: column;
}
</style>
