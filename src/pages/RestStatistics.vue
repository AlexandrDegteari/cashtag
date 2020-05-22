<template>
  <div>
    <h2>{{ restaurantName }} statistics</h2>
    <h2>{{ googleId }}</h2>
    <p>Restaurant rating: {{ restaurantRating }}</p>
    <p v-if="restaurantReviewCounter">
      Restaurant Cashtag Reviews: {{ restaurantReviewCounter }}
    </p>
    <p v-if="restaurantReviews">
      Restaurant All Reviews: {{ restaurantReviews.length }}
    </p>
    <p>Restaurant last reviews : {{ restaurantReviews }}</p>
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
      restaurantReviews: this.restaurantReviews,
      restaurantReviewCounter: this.restaurantReviewCounter
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
          this.restaurantReviewCounter = response.restaurantReviewCounter;
          this.googleId = response.googleId;
          this.getRestaurantsData();
        })
        .catch(() => {});
    },
    getRestaurantsData() {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
      const apiKey = "AIzaSyBNljWVEJJkYtalmgBaG_P1I5ZjviZ8j6A";
      this.$axios
        .get(proxy + url + this.googleId + "&key=" + apiKey)
        .then(response => {
          this.restaurantRating = response.data.result.rating;
          this.restaurantReviews = response.data.result.reviews;
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
