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
                  <th>{{ rest.googleId }}</th>
                  <th>
                    <QrCodeGen
                      :value="
                        'http://cashtag.michaelringlein.com/#/restaurants/' +
                          rest.googleId
                      "
                    >
                    </QrCodeGen>
                    <router-link
                      :to="{
                        name: 'review',
                        params: { googleId: rest.googleId }
                      }"
                      exact
                      active-class="active"
                      >Rate this Restaurant</router-link
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
