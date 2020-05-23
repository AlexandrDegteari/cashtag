<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <p v-if="!restaurants">No restaurants registered</p>
        <div v-if="restaurants" class=" q-pt-xl q-pb-xl q-pa-xl">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Google ID</th>
                <th scope="col">Generate QR Code</th>
                <th scope="col">Review Page Link</th>
                <th scope="col">Edit Data</th>
                <th scope="col">Delete Restaurant</th>
              </tr>
            </thead>
            <tbody v-for="rest in restaurants" :key="rest.id">
              <tr v-if="!rest.admin && !rest.guest">
                <th>
                  {{ rest.restaurantName }}
                </th>
                <th>
                  {{ rest.googleId }}
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
                      params: {
                        googleId: rest.googleId,
                        userId: rest.id
                      }
                    }"
                    exact
                    active-class="active"
                    >Review page</router-link
                  >
                </th>
                <th>
                  <a class="cursor-pointer" @click="rest.createdDate = true">
                    Edit Data
                  </a>
                  <q-dialog v-model="rest.createdDate">
                    <edit :return-value.sync="modalActive" :restaurant="rest" />
                  </q-dialog>
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
                            rest.id
                        "
                      >
                      </QrCodeGen>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <th>
                  <div
                    @click="rest.restaurantAddress = true"
                    class="text-red cursor-pointer"
                  >
                    Delete
                  </div>
                  <q-dialog v-model.trim="rest.restaurantAddress">
                    <q-card>
                      <q-card-section>
                        <div class="text-h6">
                          Are you sure that you want to delete
                          {{ rest.restaurantName }}?
                        </div>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn
                          @click="deleteRestaurant(rest.id)"
                          flat
                          label="Delete restaurant"
                          color="danger"
                          v-close-popup
                        />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </th>
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
import UserService from "../services/user.service";
import Edit from "./Edit";
export default {
  components: { Edit, QrCodeGen },
  props: {
    restaurant: Object
  },
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
      modalActive: false,
      deleteModal: false,
      deleteSuccess: null
    };
  },
  methods: {
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
    },
    deleteRestaurant(userId) {
      UserService.DeleteUser(userId)
        .then(response => {
          this.deleteSuccess = response;
        })
        .catch(() => {});
    }
  },
  mounted() {
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
