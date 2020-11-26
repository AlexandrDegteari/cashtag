<template>
  <div>
    <div class="column items-center q-pa-md restaurant-header">
      <div class="col">
        <img :src="restaurantAvatar" alt="" class="restaurant-logo" />
      </div>
    </div>
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img :src="restaurantImage">
          <div class=" absolute-full text-subtitle2 column flex flex-center">
            <p></p>
            <div class="welcome-2019 text-center">
              <h2>
                {{
                  !premium
                    ? "Vielen Dank für deine Bewertung"
                    : `Herzlich willkommen als Premium User von ${restaurantName}. Wir halten dich über Aktionen und Angebote auf dem laufenden. Bis bald!`
                }}
              </h2>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div v-if="!premium" class="wrapper">
      <main>
        <div class="bg-voucher">
          <div class="container text-center q-pt-sm q-pb-lg">
            <h1>
              {{ restaurantName }}
            </h1>
            <h2>
              Name:
              {{
                restaurantVoucherName ? restaurantVoucherName : "Gratis Kaffe"
              }}
            </h2>
            <h2>
              Code:
              {{
                restaurantVoucherCode
                  ? restaurantVoucherCode
                  : "free-coffee-mai"
              }}
            </h2>
          </div>
        </div>
        <div class="container q-pt-xl">
          <h2 class="text-center">Nächster Schritt</h2>
          <div class="q-pa-xl">
            <div class="row q-pb-xl items-center">
              <div class="col-4">
                <q-img src="~assets/icons/fourth.svg" width="5rem" />
              </div>
              <div class="col-8">
                <p>
                  Zeige diesen Text einem Angestellten um dein Geschenk zu
                  erhalten
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="container q-pt-xl">
          <div class="q-pa-sm">
            <div class="row q-pb-sm items-center">
              <div class="col-12">
                <p class="subtitle">
                  Teilnahmebedingungen: Pro Person nur ein Gutschein. Gutschein
                  ist nur einmalig einlösbar. Gutschein ist nur in Kombination
                  mit einer Bestellung gültig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import UserService from "../services/user.service";

export default {
  name: "Voucher",
  data() {
    return {
      userId: this.$route.params.userId,
      premium: this.$route.params.premium,
      restaurantName: null,
      restaurantAvatar: null,
      restaurantImage: null,
      restaurantVoucherName: null,
      restaurantVoucherCode: null
    };
  },
  methods: {
    getRestaurantById(userId) {
      UserService.GetUserById(userId)
        .then(response => {
          this.restaurantName = response.restaurantName;
          this.restaurantAvatar = response.restaurantAvatar;
          this.restaurantAddress = response.restaurantAddress;
          this.restaurantImage = response.restaurantImage;
          this.restaurantReviewCounter = response.restaurantReviewCounter;
          this.restaurantVoucherCounter = response.restaurantVoucherCounter;
          this.restaurantVoucherName = response.restaurantVoucherName;
          this.restaurantVoucherCode = response.restaurantVoucherCode;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    this.getRestaurantById(this.userId);
  }
};
</script>
<style scoped></style>
