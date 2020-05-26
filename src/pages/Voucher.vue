<template>
  <div>
    <div class="column items-center q-pa-md restaurant-header">
      <div class="col">
        <img
          :src="
            restaurantAvatar
              ? restaurantAvatar
              : '..src/assets/Cashtag-Black-png'
          "
          alt=""
          class="restaurant-logo"
        />
      </div>
    </div>
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img
          :src="
            restaurantImage
              ? restaurantImage
              : 'https://img.jakpost.net/c/2017/04/17/2017_04_17_25228_1492395137._large.jpg'
          "
        >
          <div class=" absolute-full text-subtitle2 column flex flex-center">
            <p></p>
            <div class="welcome-2019 text-center">
              <h2>Vielen Dank für deine Bewertung</h2>
            </div>
          </div>
        </q-img>
      </div>
    </div>

    <div class="wrapper">
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
        <!--        <div class="mcwidget-embed" data-widget-id="10861285"></div>-->
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
export default {
  name: "Voucher",
  data() {
    return {
      userId: this.$route.params.userId,
      restaurantName: this.$route.params.restaurantName,
      restaurantImage: this.$route.params.restaurantImage,
      restaurantVoucherName: this.$route.params.restaurantVoucherName,
      restaurantVoucherCode: this.$route.params.restaurantVoucherCode,
      restaurantAvatar: this.$route.params.restaurantAvatar
    };
  }
};
</script>

<style scoped></style>
