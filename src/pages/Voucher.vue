<template>
  <div>
    <div class="q-col-gutter-md row items-start">
      <div class="col-12 container-fluid">
        <q-img src="../assets/cashtag-food.jpg">
          <div class=" absolute-full text-subtitle2 column flex flex-center">
            <p></p>
            <div class="welcome-2019 text-center">
              <h2>Vielen Dank für deine Bewertung</h2>
            </div>

            <div class="subtitle text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
            </div>
          </div>
        </q-img>
      </div>
    </div>

    <div class="wrapper">
      <main>
        <div class="bg">
          <div class="container text-center q-pt-xl">
            <h1>
              {{ restaurantName }}
            </h1>
          </div>

          <div class="container q-pt-xl">
            <h2 class="text-center">Lorem Ipsum</h2>
            <div class="q-pa-xl">
              <div class="row">
                <q-banner>
                  <template v-slot:avatar>
                    <q-avatar
                      unelevated
                      icon="mobile_friendly"
                      color="white"
                      text-color="primary"
                      size="9rem"
                    />
                  </template>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </q-banner>
              </div>
            </div>
            <div class="q-pa-xl">
              <div class="mcwidget-embed" data-widget-id="10861285"></div>
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
      restaurantName: this.$route.params.restaurantName
    };
  }
};
</script>

<style scoped></style>
