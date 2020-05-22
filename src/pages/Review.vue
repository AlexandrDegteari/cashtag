<template>
  <div>
    <img :src="this.restaurantAvatar" alt="" />
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img
          :src="
            this.restaurantReviewImg
              ? this.restaurantReviewImg
              : 'img/cashtag-food.jpg'
          "
        >
          <div class=" absolute-full text-subtitle2 column flex flex-center">
            <p></p>
            <div class="welcome-2019 text-center">
              <h2>Sichere dir jetzt dein Geschenk</h2>
            </div>
            <p>
              <a
                v-if="!reviews"
                target="_blank"
                :href="
                  'https://search.google.com/local/writereview?placeid=' +
                    this.googleId
                "
              >
                <button class="btn" @click="makeReview">
                  Jetzt bewerten
                </button></a
              >
              <router-link
                v-if="reviews"
                :to="{
                  name: 'voucher',
                  params: {
                    googleId: this.googleId,
                    restaurantName: this.restaurantName,
                    restaurantAvatar: this.restaurantAvatar
                  }
                }"
                exact
                tag="li"
                active-class="active"
              >
                <button class="btn">
                  Geschenk abholen
                </button></router-link
              >
            </p>
            <div class="subtitle text-center">
              Kehre nach deiner Bewertung wieder auf diese Seite zurück um dein
              Geschenk abzuholen
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
                  2: Bewerte unser Restaurant online und erhalte den Gutschein
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
      </main>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      restaurantData: this.restaurantData,
      restaurantName: this.restaurantName,
      restaurantAvatar: this.restaurantAvatar,
      reviews: false,
      googleId: this.googleId,
      restaurantReviewImg: this.restaurantReviewImg,
      restaurantReviewCounter: this.restaurantReviewCounter,
      userId: this.$route.params.userId
    };
  },
  methods: {
    makeReview() {
      this.counter();
      setTimeout(() => {
        this.showVoucher();
      }, 3000);
    },
    showVoucher() {
      this.reviews = true;
    },
    counter() {
      const profile = {
        googleId: this.googleId,
        restaurantName: this.restaurantName,
        restaurantAvatar: this.restaurantAvatar,
        restaurantAddress: this.restaurantAddress,
        restaurantReviewCounter: this.restaurantReviewCounter
          ? this.restaurantReviewCounter + 1
          : 1
      };

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {
          this.$emit("updatedForm");
          console.log("The counter has been successfully updated.");
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
          this.googleId = response.googleId;
          this.restaurantReviewImg = response.restaurantReviewImg;
          this.restaurantReviewCounter = response.restaurantReviewCounter;
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
