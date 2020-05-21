<template>
  <div>
    <img :src="this.restaurantAvatar" alt="" />
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img src="../assets/cashtag-food.jpg">
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
            <h2>Name: Gratis Kaffee</h2>
            <h2>Code: free-coffee-mai</h2>
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
<!-- ManyChat -->
<script src="//widget.manychat.com/240691633480891.js" async="async"></script>
<script>
export default {
  name: "Voucher",
  data() {
    return {
      restaurantName: this.$route.params.restaurantName,
      restaurantAvatar: this.$route.params.restaurantAvatar
    };
  }
};
</script>

<style scoped></style>
