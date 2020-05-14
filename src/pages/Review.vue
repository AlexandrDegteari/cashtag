<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="bg">
          <div class="container q-pt-xl">
            <h2>Nice to meet you in our restaurant</h2>
            <p>
              Please make a review for our restaurant and take your free coffee
            </p>
            <a
              v-if="!reviews"
              target="_blank"
              :href="
                'https://search.google.com/local/writereview?placeid=' +
                  'rest.googleId'
              "
            >
              <button class="btn" :click="makeReview">
                Make review now!
              </button></a
            >
            <router-link
              v-if="reviews"
              :to="{ path: '/voucher' }"
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
      restaurants: null,
      selectedRestaurant: null,
      reviews: false
    };
  },
  methods: {
    makeReview() {
      window.open(
        "https://search.google.com/local/writereview?placeid=" + "rest.googleId"
      );
      // setTimeout(function() {
      //   this.review = true;
      // }, 3000);
      this.reviews = true;
    }
  }
};
</script>

<style scoped></style>
