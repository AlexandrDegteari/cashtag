<template>
  <div>
    <img :src="this.restaurantAvatar" alt="" />
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img src="../assets/cashtag-food.jpg">
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
        <div class="bg">
          <div class="container text-center q-pt-xl">
            <h1>
              {{ restaurantName }}
            </h1>
          </div>

          <div class="container q-pt-xl">
            <h2 class="text-center">So funktioniert es:</h2>
            <div class="q-pa-xl">
              <div class="row">
                <q-banner>
                  <template v-slot:avatar>
                    <q-avatar
                      unelevated
                      icon="mobile_friendly"
                      color="white"
                      text-color="primary"
                      size="9rem"
                    />
                  </template>
                  <p>1: Scanne den QR-Code</p>
                </q-banner>
              </div>

              <div class="row">
                <q-banner>
                  <template v-slot:avatar>
                    <q-avatar
                      unelevated
                      icon="chat_bubble_outline"
                      color="white"
                      text-color="primary"
                      size="9rem"
                    />
                  </template>
                  <p>
                    2: Bewerte unser Restaurant online und erhalte den Gutschein
                  </p>
                </q-banner>
              </div>

              <div class="row">
                <q-banner>
                  <template v-slot:avatar>
                    <q-avatar
                      unelevated
                      icon="redeem"
                      color="white"
                      text-color="primary"
                      size="9rem"
                    />
                  </template>
                  <p>
                    3: Komme nach der Bewertung zurück auf diese Seite und zeige
                    den Gutschein vor
                  </p>
                </q-banner>
              </div>
            </div>
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
      setTimeout(() => {
        this.showVoucher();
      }, 10000);
    },
    showVoucher() {
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

<style scoped>
.column {
  flex-direction: column;
}
</style>
