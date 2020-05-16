<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class=" q-pt-xl q-pb-xl q-pa-xl">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Restaurant Address</th>
                <th scope="col">Google ID</th>
                <th scope="col">Generate QR Code</th>
                <th scope="col">Review Page Link</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rest, key) in restaurants" :key="key">
                <th>{{ rest.restaurantName }}</th>
                <th>{{ rest.restaurantAddress }}</th>
                <th>{{ rest.googleId }}</th>
                <th>
                  <a class="cursor-pointer" @click="rest.googleId = true">
                    Generate QR Code
                  </a>
                </th>
                <th>
                  <router-link
                    :to="{
                      name: 'review',
                      params: { googleId: rest.googleId }
                    }"
                    exact
                    active-class="active"
                    >Review page</router-link
                  >
                </th>
                <q-dialog v-model.trim="rest.googleId">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">
                        {{ rest.restaurantName }}
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <QrCodeGen
                        :value="
                          'http://cashtag.michaelringlein.com/#/review/' +
                            rest.googleId
                        "
                      >
                      </QrCodeGen>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </tr>
            </tbody>
          </table>
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
        .get("https://protected-garden-19195.herokuapp.com/users")
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

thead th {
  font-weight: bold;
}
th {
  font-weight: normal;
  border: 1px solid;
}

table {
  position: relative;
  width: 100%;
  margin: 0;
  line-height: 3.5;
  border-spacing: 0;
  border-collapse: collapse;
  border: 1px solid;
}
</style>
