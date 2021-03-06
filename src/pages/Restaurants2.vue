<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <h1 class="text-center">Restaurants</h1>
        <h2 v-if="!data" class="text-center">Bitte warten...</h2>
        <div v-if="data" class=" q-pa-xl">
          <div class="q-pa-md">
            <q-table
              title="Restaurants"
              :data="data"
              :columns="columns"
              row-key="id"
              :loading="loading"
              :filter="filter"
              @request="onRequest"
              binary-state-sort
            >
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search"></q-icon>
                  </template>
                </q-input>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <router-link
                    :to="{
                      name: 'review',
                      params: {
                        googleId: props.row.googleId,
                        userId: props.row.id
                      }
                    }"
                    exact
                    active-class="active"
                  >
                    <q-btn flat dense round color="grey" icon="link" />
                  </router-link>
                  <q-btn
                    :to="{
                      name: 'guest-table',
                      params: {
                        userId: props.row.id
                      }
                    }"
                    exact
                    active-class="active"
                    dense
                    round
                    flat
                    color="grey"
                    icon="people"
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="openQrDialog(props.row.id)"
                    icon="code"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="openEditDialog(props.row.id)"
                    icon="edit"
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="openDeleteDialog(props.row.id)"
                    icon="delete"
                  ></q-btn>
                  <q-dialog
                    v-if="props.row.id === currentID"
                    v-model="qrDialogActive"
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
                          {{ props.row.restaurantName }}
                        </div>
                      </q-card-section>
                      <q-card-section class="q-pt-none">
                        <QrCodeGen
                          :value="
                            `https://app.mycashtag.de/#/review/${props.row.googleId}/${props.row.id}`
                          "
                        >
                        </QrCodeGen>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <q-dialog
                    v-if="props.row.id === currentID"
                    v-model="editDialogActive"
                    persistent
                  >
                    <edit :restaurant="props.row" />
                  </q-dialog>
                  <q-dialog
                    v-if="props.row.id === currentID"
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
                          {{ props.row.restaurantName }} löschen möchten?
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
                          @click="deleteRestaurant(props.row.id)"
                          flat
                          label="Restaurant löschen"
                          color="red"
                          v-close-popup
                        />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </q-td>
              </template>
            </q-table>
          </div>
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
  data() {
    return {
      googleId: null,
      userId: null,
      restaurants: null,
      restaurantsData: null,
      message: null,
      modalActive: false,
      deleteModal: false,
      deleteSuccess: null,
      qrDialogActive: false,
      editDialogActive: false,
      deleteDialogActive: false,
      currentID: null,
      filter: "",
      loading: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        {
          name: "restaurantName",
          required: true,
          label: "Restaurant Name",
          align: "left",
          field: row => row.restaurantName,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "googleId",
          align: "center",
          label: "GoogleID",
          field: row => row.googleId,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          sortable: true
        },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      data: []
    };
  },
  methods: {
    isAdmin() {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).admin;
      }
    },
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
    deleteRestaurant(userId) {
      UserService.DeleteUser(userId)
        .then(response => {
          this.deleteSuccess = response;
        })
        .catch(() => {});
    },
    onRequest() {
      UserService.GetUsers()
        .then(response => {
          this.data = response;
          this.data = this.data.filter(user => !user.admin);
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    });
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
