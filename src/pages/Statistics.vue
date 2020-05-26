<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div>
          <h1 class="text-center">Statistik</h1>
          <h2 v-if="!restaurants">Bitte warten...</h2>
          <div v-if="restaurants" class=" q-pa-xl">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Restaurant Name</th>
                  <th scope="col">Google ID</th>
                  <th scope="col">Reviews</th>
                  <th scope="col">Gutscheine</th>
                </tr>
              </thead>
              <tbody v-for="(rest, key) in restaurants" :key="key">
                <tr v-if="!rest.admin && !rest.guest">
                  <th>
                    {{ rest.restaurantName }}
                  </th>
                  <th>
                    {{ rest.googleId }}
                  </th>
                  <th>
                    {{ rest.restaurantReviewCounter }}
                  </th>
                  <th>
                    {{ rest.restaurantVoucherCounter }}
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
import UserService from "../services/user.service";

export default {
  name: "Statistics",
  data() {
    return {
      googleId: null,
      userId: null,
      restaurants: null
    };
  },
  methods: {
    getRestaurants() {
      UserService.GetUsers()
        .then(response => {
          this.restaurants = response;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    this.getRestaurants();
  }
};
</script>

<style scoped>
h2 {
  margin-top: 2rem;
  text-align: center;
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
