<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl ">
          <div class=" q-pt-xl q-pb-xl">
            <div v-if="restaurants" class="row">
              <div
                v-for="(rest, key) in restaurants"
                :key="key"
                class="col-sm-6 col-md-4"
              >
                <div class="package-block">
                  <div
                    class="q-pb-sm coin-image"
                    :style="{
                      'background-image': 'url(' + rest.bimage + ')'
                    }"
                  />
                  <h2>{{ rest.name }}</h2>
                  <div class="price">
                    <p class="price-tag">{{ rest.googleId }}</p>
                  </div>
                  <QrCodeGen
                    :value="
                      'https://search.google.com/local/writereview?placeid=' +
                        rest.googleId
                    "
                  >
                  </QrCodeGen>
                  <a
                    target="_blank"
                    :href="
                      'https://search.google.com/local/writereview?placeid=' +
                        rest.googleId
                    "
                    >Rate it!</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import QrCodeGen from "../components/AppQrCodeGen";
export default {
  components: { QrCodeGen },
  data() {
    return {
      restaurants: null,
      selectedRestaurant: null
    };
  },
  methods: {
    getRestaurants() {
      this.$axios
        .get("http://localhost:4000/auctions")
        .then(response => {
          this.restaurants = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectRestaurant(id) {
      this.selectedRestaurant = this.restaurants.find(item => item.id === id);
    }
  },
  beforeMount() {
    this.getRestaurants();
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 0.5rem;
}
.price-tag {
  font-weight: bold;
  font-size: 20px;
}
.text-bg p {
  margin: 0 auto;
  max-width: 734px;
  padding-top: 20px;
}

.package-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin: 50px 15px 30px 0;
}
.coin-image {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
