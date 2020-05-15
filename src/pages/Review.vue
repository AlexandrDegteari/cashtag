<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="bg">
          <div class="container q-pt-xl">
            <h2>
              Nice to meet you in our restaurant <b>{{ restaurantName }}</b>
              <img :src="this.restaurantAvatar" alt="" />
            </h2>

            <p>
              Please make a review for our restaurant and take your free coffee
            </p>
            <a
              v-if="!reviews"
              target="_blank"
              :href="
                'https://search.google.com/local/writereview?placeid=' +
                  this.googleId
              "
            >
              <button class="btn" @click="makeReview">
                Make review now!
              </button></a
            >
            <router-link
              v-if="reviews"
              :to="{
                name: 'voucher',
                params: {
                  googleId: this.googleId,
                  restaurantName: this.restaurantName
                }
              }"
              exact
              tag="li"
              active-class="active"
            >
              <button class="btn">
                Take your voucher!
              </button></router-link
            >
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurantData: this.restaurantData,
      restaurantName: this.restaurantName,
      restaurantAvatar: this.restaurantAvatar,
      reviews: false,
      googleId: this.$route.params.googleId
    };
  },
  methods: {
    makeReview() {
      this.reviews = true;
    },
    getRestaurantsData() {
      console.log("getData");
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
      const apiKey = "AIzaSyBNljWVEJJkYtalmgBaG_P1I5ZjviZ8j6A";
      this.$axios
        .get(proxy + url + this.googleId + "&key=" + apiKey)
        .then(response => {
          this.restaurantData = response;
          this.restaurantName = response.data.result.name;
          this.restaurantAvatar = response.data.result.icon;
          console.log(response);
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getRestaurantsData();
  }
};
</script>

<style scoped></style>
