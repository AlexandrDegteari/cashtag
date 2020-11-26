<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="d-flex justify-between align-center q-px-xl">
          <h1 class="text-center">Guest Table</h1>
          <q-btn
            class="sendAll q-my-xl"
            color="primary"
            @click="smsAllDialogActive = true"
            icon="message"
            label="Send Promo to All"
          ></q-btn>
        </div>
        <h2 v-if="!data" class="text-center">Bitte warten...</h2>
        <div v-if="data" class=" q-pa-xl">
          <div class="q-pa-md">
            <q-table
              title="Guests"
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
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="openSmsDialog(props.row.phone)"
                    icon="message"
                  ></q-btn>
                  <q-dialog
                    v-if="props.row.phone === currentID"
                    v-model="smsDialogActive"
                  >
                    <ContactForm :sms="true" :numbers="props.row.phone" />
                  </q-dialog>
                  <q-dialog v-model="smsAllDialogActive">
                    <ContactForm :sms="true" :numbers="numbers" />
                  </q-dialog>
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="openDeleteDialog(props.row.phone)"
                    icon="delete"
                  ></q-btn>
                  <q-dialog
                    v-if="props.row.phone === currentID"
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
                          Are you sure delete
                          {{ props.row.phone }} contact??
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
                          @click="deleteContact(props.row.phone)"
                          flat
                          label="Delete Contact"
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
import UserService from "../services/user.service";
import ContactForm from "./ContactForm";

export default {
  components: { ContactForm },
  data() {
    return {
      restaurantGuests: null,
      userId: this.$route.params.userId,
      googleId: null,
      restaurants: null,
      restaurantsData: null,
      message: null,
      modalActive: false,
      deleteModal: false,
      deleteSuccess: null,
      deleteDialogActive: false,
      smsDialogActive: false,
      smsAllDialogActive: false,
      currentID: null,
      numbers: [],
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
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "phone",
          align: "center",
          label: "Phone",
          field: row => row.phone,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          sortable: true
        },
        { name: "actions", label: "Actions", field: "", align: "center" }
      ],
      data: []
    };
  },
  methods: {
    openDeleteDialog(id) {
      this.currentID = id;
      this.deleteDialogActive = true;
    },
    openSmsDialog(id) {
      this.currentID = id;
      this.smsDialogActive = true;
    },
    deleteRestaurant(userId) {
      UserService.DeleteUser(userId)
        .then(response => {
          this.deleteSuccess = response;
        })
        .catch(() => {});
    },
    async deleteContact(phone) {
      await UserService.GetUserById(this.userId)
        .then(response => {
          this.restaurantGuests = response.restaurantGuests;
        })
        .catch(() => {});
      this.restaurantGuests = this.restaurantGuests.filter(
        el => el.phone !== phone
      );
      console.log(this.restaurantGuests);
      const profile = {
        restaurantGuests: this.restaurantGuests
      };

      UserService.UpdateUserProf(profile, this.userId)
        .then(() => {
          // console.log("Guest Saved");
        })
        .catch(error => {
          console.log(error.error.response.data);
        });
    },
    onRequest() {
      UserService.GetUsers()
        .then(response => {
          this.data = response;
          this.data = this.data.filter(user => user._id === this.userId);
          this.data = this.data[0].restaurantGuests;
          for (let contact of this.data) {
            this.numbers.push(contact.phone);
          }
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

.sendAll {
  height: min-content;
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
