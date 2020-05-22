<template>
  <div class="wrapper">
    <main>
      <div class="container q-pt-xl">
        <h1 class="text-center">{{ restaurantName }}</h1>
        <p class="text-center">
          Google ID: <code>{{ googleId }}</code>
        </p>

        <div class="q-pa-xl">
          <div class="row q-pb-xl">
            <div class="col-sm-6">
              <h2>Letzte 5 Bewertungen</h2>
              <div v-if="restaurantReviews" class="q-pt-xl q-pb-xl q-pr-xl">
                <q-card
                  v-for="(review, key) in restaurantReviews"
                  :key="key"
                  class="my-card"
                >
                  <q-card-section>
                    <div class="row no-wrap items-center">
                      <div class="col text-h6 ellipsis">
                        {{ review.author_name }}
                      </div>
                    </div>

                    <q-rating
                      v-model="stars"
                      :max="review.rating"
                      color="yellow"
                      size="2em"
                      readonly
                    />
                    ({{ review.rating }})
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <div class="text-subtitle1">
                      {{ review.text }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ review.relative_time_description }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div class="col-sm-6">
              <h2>Statistik</h2>
              <div class="row">
                <div class="col-8">
                  <p>Durchschnittliche Bewertung:</p>
                </div>
                <div class="col-4">
                  <p>{{ restaurantRating }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                  <p>Seitenbesuche:</p>
                </div>
                <div class="col-4">
                  <p>INSERT PAGEVIEWS HERE</p>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                  <p>Gutscheine eingelöst:</p>
                </div>
                <div class="col-4">
                  <p>INSERT CLAIMED VOUCHERS HERE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--
      <div>
        <h2>{{ restaurantName }} statistics</h2>
        <h2>{{ googleId }}</h2>
        <p>Restaurant rating: {{ restaurantRating }}</p>
        <p v-if="restaurantReviews">
          Restaurant reviews counter: {{ restaurantReviews.length }}
        </p>
        <p>Restaurant last reviews : {{ restaurantReviews }}</p>
      </div>
      -->
    </main>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      restaurantName: this.restaurantName,
      restaurantRating: this.restaurantRating,
      googleId: this.googleId,
      restaurantReviews: this.restaurantReviews
    };
  },
  methods: {
    getUser() {
      console.log("getUser");
      UserService.GetUserInfo()
        .then(response => {
          this.response = response;
          this.restaurantName = response.restaurantName;
          this.restaurantAvatar = response.restaurantAvatar;
          this.restaurantAddress = response.restaurantAddress;
          this.googleId = response.googleId;
          this.getRestaurantsData();
        })
        .catch(() => {});
    },
    getRestaurantsData() {
      console.log("getData");
      console.log(this.googleId);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
      const apiKey = "AIzaSyBNljWVEJJkYtalmgBaG_P1I5ZjviZ8j6A";
      this.$axios
        .get(proxy + url + this.googleId + "&key=" + apiKey)
        .then(response => {
          this.restaurantRating = response.data.result.rating;
          this.restaurantReviews = response.data.result.reviews;
          this.restaurantReviewsName = response.data.result.reviews.author_name;
          console.log(response);
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getUser();
  }
};
</script>

<style scoped></style>
