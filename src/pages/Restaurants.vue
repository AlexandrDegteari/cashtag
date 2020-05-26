<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <h1 v-if="!restaurants" class="text-center">Bitte warten...</h1>
        <div v-if="restaurants" class=" q-pt-xl q-pb-xl q-pa-xl">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Google ID</th>
                <th scope="col">QR Code</th>
                <th scope="col">Review Seite</th>
                <th scope="col">Editieren</th>
                <th scope="col">Löschen</th>
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
                  <a class="cursor-pointer" @click="openQrDialog(rest.id)">
                    <q-btn flat label="QR-Code anzeigen" color="primary" />
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
                  >
                    <q-btn flat label="Seite Anzeigen" color="primary" />
                  </router-link>
                </th>
                <th>
                  <a class="cursor-pointer" @click="openEditDialog(rest.id)">
                    <q-btn flat label="Editieren" color="secondary" />
                  </a>
                  <q-dialog
                    v-if="rest.id === currentID"
                    v-model="editDialogActive"
                    persistent
                  >
                    <edit :restaurant="rest" />
                  </q-dialog>
                </th>
                <q-dialog v-if="rest.id === currentID" v-model="qrDialogActive">
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
                    @click="openDeleteDialog(rest.id)"
                    class="text-red cursor-pointer"
                  >
                    <q-btn flat label="Löschen" color="danger" />
                  </div>
                  <q-dialog
                    v-if="rest.id === currentID"
                    v-model="deleteDialogActive"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="column items-end">
                          <q-btn
                            v-close-popup
                            round
                            dense
                            color="secondary"
                            icon="close"
                          />
                        </div>
                        <div class="text-h6">
                          Sind Sie sich sicher dass Sie
                          {{ rest.restaurantName }} löschen möchten?
                        </div>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Abbrechen"
                          color="secondary"
                          v-close-popup
                        />
                        <q-btn
                          @click="deleteRestaurant(rest.id)"
                          flat
                          label="Restaurant löschen"
                          color="red"
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
      deleteSuccess: null,
      qrDialogActive: false,
      editDialogActive: false,
      deleteDialogActive: false,
      currentID: null
    };
  },
  methods: {
    openQrDialog(id) {
      this.currentID = id;
      this.qrDialogActive = true;
    },
    openEditDialog(id) {
      this.currentID = id;
      this.editDialogActive = true;
    },
    openDeleteDialog(id) {
      this.currentID = id;
      this.deleteDialogActive = true;
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
