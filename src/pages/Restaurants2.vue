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
              :pagination.sync="pagination"
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
              <!--              <template v-slot:body-cell-actions="props">-->
              <!--                <q-td :props="props">-->
              <!--                  <router-link-->
              <!--                    :to="{-->
              <!--                      name: 'review',-->
              <!--                      params: {-->
              <!--                        googleId: props.googleId,-->
              <!--                        userId: props.id-->
              <!--                      }-->
              <!--                    }"-->
              <!--                    exact-->
              <!--                    active-class="active"-->
              <!--                  >-->
              <!--                    <q-btn flat dense round color="grey" icon="link" />-->
              <!--                  </router-link>-->
              <!--                  <q-btn-->
              <!--                    dense-->
              <!--                    round-->
              <!--                    flat-->
              <!--                    color="grey"-->
              <!--                    @click="openQrDialog(props.id)"-->
              <!--                    icon="code"-->
              <!--                  ></q-btn>-->
              <!--                  <q-btn-->
              <!--                    dense-->
              <!--                    round-->
              <!--                    flat-->
              <!--                    color="grey"-->
              <!--                    @click="openEditDialog(props.id)"-->
              <!--                    icon="edit"-->
              <!--                  ></q-btn>-->
              <!--                  <q-btn-->
              <!--                    dense-->
              <!--                    round-->
              <!--                    flat-->
              <!--                    color="grey"-->
              <!--                    @click="openDeleteDialog(props.id)"-->
              <!--                    icon="delete"-->
              <!--                  ></q-btn>-->
              <!--                </q-td>-->
              <!--              </template>-->
              <!--              <q-dialog v-if="rest.id === currentID" v-model="qrDialogActive">-->
              <!--                <q-card>-->
              <!--                  <q-card-section>-->
              <!--                    <div class="column items-end">-->
              <!--                      <q-btn-->
              <!--                        v-close-popup-->
              <!--                        round-->
              <!--                        dense-->
              <!--                        color="secondary"-->
              <!--                        icon="close"-->
              <!--                      />-->
              <!--                    </div>-->
              <!--                    <div class="text-h6">-->
              <!--                      {{ rest.restaurantName }}-->
              <!--                    </div>-->
              <!--                  </q-card-section>-->
              <!--                  <q-card-section class="q-pt-none">-->
              <!--                    <QrCodeGen-->
              <!--                      :value="-->
              <!--                        'http://cashtag.michaelringlein.com/#/review/' + rest.id-->
              <!--                      "-->
              <!--                    >-->
              <!--                    </QrCodeGen>-->
              <!--                  </q-card-section>-->

              <!--                  <q-card-actions align="right">-->
              <!--                    <q-btn flat label="OK" color="primary" v-close-popup />-->
              <!--                  </q-card-actions>-->
              <!--                </q-card>-->
              <!--              </q-dialog>-->
              <!--              <q-dialog-->
              <!--                v-if="rest.id === currentID"-->
              <!--                v-model="editDialogActive"-->
              <!--                persistent-->
              <!--              >-->
              <!--                <edit :restaurant="rest" />-->
              <!--              </q-dialog>-->
              <!--              <q-dialog-->
              <!--                v-if="rest.id === currentID"-->
              <!--                v-model="deleteDialogActive"-->
              <!--              >-->
              <!--                <q-card>-->
              <!--                  <q-card-section>-->
              <!--                    <div class="column items-end">-->
              <!--                      <q-btn-->
              <!--                        v-close-popup-->
              <!--                        round-->
              <!--                        dense-->
              <!--                        color="secondary"-->
              <!--                        icon="close"-->
              <!--                      />-->
              <!--                    </div>-->
              <!--                    <div class="text-h6">-->
              <!--                      Sind Sie sich sicher dass Sie-->
              <!--                      {{ rest.restaurantName }} löschen möchten?-->
              <!--                    </div>-->
              <!--                  </q-card-section>-->
              <!--                  <q-card-actions align="right">-->
              <!--                    <q-btn-->
              <!--                      flat-->
              <!--                      label="Abbrechen"-->
              <!--                      color="secondary"-->
              <!--                      v-close-popup-->
              <!--                    />-->
              <!--                    <q-btn-->
              <!--                      @click="deleteRestaurant(rest.id)"-->
              <!--                      flat-->
              <!--                      label="Restaurant löschen"-->
              <!--                      color="red"-->
              <!--                      v-close-popup-->
              <!--                    />-->
              <!--                  </q-card-actions>-->
              <!--                </q-card>-->
              <!--              </q-dialog>-->
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
  // eslint-disable-next-line vue/no-unused-components
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
          name: "restName",
          required: true,
          label: "Restaurant Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "GoogleID",
          align: "center",
          label: "GoogleID",
          field: "calories",
          sortable: true
        },
        // {
        //   name: "iron",
        //   label: "Iron (%)",
        //   field: "iron",
        //   sortable: true,
        //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        // },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      data: [],
      original: [
        {
          id: 1,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          id: 3,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          id: 4,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          id: 5,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          id: 6,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          id: 7,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          id: 8,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          id: 9,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          id: 10,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        },
        {
          id: 11,
          name: "Frozen Yogurt-1",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          id: 12,
          name: "Ice cream sandwich-1",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          id: 13,
          name: "Eclair-1",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          id: 14,
          name: "Cupcake-1",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          id: 15,
          name: "Gingerbread-1",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          id: 16,
          name: "Jelly bean-1",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          id: 17,
          name: "Lollipop-1",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          id: 18,
          name: "Honeycomb-1",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          id: 19,
          name: "Donut-1",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          id: 20,
          name: "KitKat-1",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        },
        {
          id: 21,
          name: "Frozen Yogurt-2",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          id: 22,
          name: "Ice cream sandwich-2",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          id: 23,
          name: "Eclair-2",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          id: 24,
          name: "Cupcake-2",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          id: 25,
          name: "Gingerbread-2",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          id: 26,
          name: "Jelly bean-2",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          id: 27,
          name: "Lollipop-2",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          id: 28,
          name: "Honeycomb-2",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          id: 29,
          name: "Donut-2",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          id: 30,
          name: "KitKat-2",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        },
        {
          id: 31,
          name: "Frozen Yogurt-3",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          id: 32,
          name: "Ice cream sandwich-3",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          id: 33,
          name: "Eclair-3",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          id: 34,
          name: "Cupcake-3",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          id: 35,
          name: "Gingerbread-3",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          id: 36,
          name: "Jelly bean-3",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          id: 37,
          name: "Lollipop-3",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          id: 38,
          name: "Honeycomb-3",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          id: 39,
          name: "Donut-3",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          id: 40,
          name: "KitKat-3",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
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
    // getRestaurants() {
    //   UserService.GetUsers()
    //     .then(response => {
    //       this.restaurants = response;
    //       this.restaurantName = response.restaurantName;
    //       this.restaurantAvatar = response.restaurantAvatar;
    //       this.restaurantAddress = response.restaurantAddress;
    //       this.googleId = response.googleId;
    //     })
    //     .catch(() => {});
    // },
    deleteRestaurant(userId) {
      UserService.DeleteUser(userId)
        .then(response => {
          this.deleteSuccess = response;
        })
        .catch(() => {});
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.loading = true;
      UserService.GetUsers()
        .then(response => {
          this.data = response;
          // this.restaurantName = response.restaurantName;
          // this.restaurantAvatar = response.restaurantAvatar;
          // this.restaurantAddress = response.restaurantAddress;
          // this.googleId = response.googleId;
        })
        .catch(() => {});
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 1500);
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.data.filter(row => row.name.includes(filter))
        : this.data.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "desc"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.data.length;
      }
      let count = 0;
      this.data.forEach(treat => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    }
    // editRow(props) {
    //   this.noti();
    //   // do something
    //   this.noti = this.$q.notify({
    //     type: "info",
    //     textColor: "grey-10",
    //     multiLine: true,
    //     message: `I'll edit row data => ${JSON.stringify(props.row)
    //       .split(",")
    //       .join(", ")}`,
    //     timeout: 2000
    //   });
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
