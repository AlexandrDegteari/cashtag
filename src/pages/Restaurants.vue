<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <p v-if="!restaurants">No restaurants registered</p>
        <div v-if="restaurants" class=" q-pt-xl q-pb-xl q-pa-xl">
          <form class="q-pt-xl" @submit.prevent="submitProfileForm">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Restaurant Name</th>
                  <th scope="col">Restaurant Address</th>
                  <th scope="col">Google ID</th>
                  <th scope="col">Update Data</th>
                  <th scope="col">Generate QR Code</th>
                  <th scope="col">Review Page Link</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rest, key) in restaurants" :key="key">
                  <th>
                    <input
                      class="mt-1"
                      id="username"
                      type="text"
                      v-model="rest.restaurantName"
                    />
                  </th>
                  <th>
                    <input
                      :value="rest.restaurantAddress"
                      class="mt-1"
                      id="restaurantAddress"
                      type="text"
                    />
                  </th>
                  <th>
                    <input
                      v-model="rest.googleId"
                      class="mt-1"
                      id="googleId"
                      type="text"
                    />
                  </th>
                  <th>
                    <div
                      class="cursor-pointer"
                      @click="
                        submitProfileForm(
                          rest.id,
                          rest.googleId,
                          rest.restaurantName,
                          rest.restaurantAvatar,
                          rest.restaurantAddress
                        )
                      "
                    >
                      Update Data
                    </div>
                  </th>
                  <th>
                    <a
                      class="cursor-pointer"
                      @click="rest.restaurantAvatar = true"
                    >
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
                  <q-dialog v-model.trim="rest.restaurantAvatar">
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
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import QrCodeGen from "../components/AppQrCodeGen";
import UserService from "../services/user.service";
export default {
  components: { QrCodeGen },
  data() {
    return {
      googleId: null,
      userId: null,
      restaurants: null,
      restaurantsData: null,
      // restaurantName: this.rest.restaurantName,
      // restaurantAvatar: this.rest.restaurantAvatar,
      // restaurantAddress: this.rest.restaurantAddress,
      message: null,
      modalActive: false
    };
  },
  methods: {
    submitProfileForm(userId, googleId, restName, restAva, restAddress) {
      const profile = {
        googleId: googleId,
        restaurantName: restName,
        restaurantAvatar: restAva,
        restaurantAddress: restAddress
      };

      this.message = null;

      UserService.UpdateUserProf(profile, userId)
        .then(() => {
          this.$emit("updatedForm");
          this.message = "The profile has been successfully updated.";
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    getRestaurants() {
      UserService.GetUsers()
        .then(response => {
          this.restaurants = response;
          this.restaurantName = response.restaurantName;
          this.restaurantAvatar = response.restaurantAvatar;
          this.restaurantAddress = response.restaurantAddress;
          this.googleId = response.googleId;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    this.getRestaurants();
    console.log(this.restaurants);
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
