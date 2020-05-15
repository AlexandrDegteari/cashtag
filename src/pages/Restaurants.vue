<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl ">
          <div class=" q-pt-xl q-pb-xl">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Another</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rest, key) in restaurants" :key="key">
                  <th>{{ rest.username }}</th>
                  <th>{{ rest.email }}</th>
                  <th>{{ getRestaurantsData(rest.googleId) }}</th>
                  <th>{{ rest.googleId }}</th>
                  <th>
                    <QrCodeGen
                      :value="
                        'https://search.google.com/local/writereview?placeid=' +
                          rest.googleId
                      "
                    >
                    </QrCodeGen>
                    <a
                      target="_blank"
                      :href="
                        'https://search.google.com/local/writereview?placeid=' +
                          rest.googleId
                      "
                      >Rate it!</a
                    >
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import QrCodeGen from "../components/AppQrCodeGen";
export default {
  components: { QrCodeGen },
  data() {
    return {
      restaurants: null,
      restaurantsData: null,
      restaurantName: null,
      selectedRestaurant: null
    };
  },
  methods: {
    getRestaurants() {
      this.$axios
        .get("http://localhost:4000/users")
        .then(response => {
          this.restaurants = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRestaurantsData(placeId) {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url =
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
      const apiKey = "AIzaSyBNljWVEJJkYtalmgBaG_P1I5ZjviZ8j6A";
      this.$axios
        .get(proxy + url + placeId + "&key=" + apiKey)
        .then(response => {
          this.response = response;
          this.restaurantName = console.log(response.data.result.name);
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    },

    selectRestaurant(id) {
      this.selectedRestaurant = this.restaurants.find(item => item.id === id);
    }
  },
  beforeMount() {
    this.getRestaurants();
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 0.5rem;
}

.text-bg p {
  margin: 0 auto;
  max-width: 734px;
  padding-top: 20px;
}
</style>
