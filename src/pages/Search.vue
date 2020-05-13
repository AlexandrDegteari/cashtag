<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl ">
          <div class="form relative-position">
            <form action="">
              <div class="input1">
                <input
                  id="input1"
                  type="text"
                  placeholder="Select a category..."
                />
                <label for="input1"></label>
              </div>
              <div class="input2">
                <input
                  id="input2"
                  type="text"
                  placeholder="Enter title auction"
                />
                <label for="input2"></label>
              </div>
              <button class="btn search">Search</button>
            </form>
          </div>
          <div class=" q-pt-xl q-pb-xl">
            <img class="title" src="../assets/Title_auc.png" alt="Auctions" />
            <div v-if="auctions" class="row">
              <div
                v-for="(auc, key) in auctions"
                :key="key"
                class="col-sm-6 col-md-4"
              >
                <div class="package-block">
                  <div
                    class="q-pb-sm coin-image"
                    :style="{
                      'background-image': 'url(' + auc.bimage + ')'
                    }"
                  />
                  <h2>{{ auc.name }}</h2>
                  <p class="blue-text q-pb-md font-20">
                    Value {{ Math.round(auc.price) }} €
                  </p>
                  <div
                    class="row  w-100 text-center d-flex justify-around q-pt-sm q-pb-md"
                  >
                    <div class="col-6 q-pl-md">
                      <div class="price">
                        <p class="price-tag">
                          {{ Math.round(auc.maxPrice) }} €
                        </p>
                        <p class="green-price">Max Price</p>
                      </div>
                    </div>
                    <div class="col-6 q-pr-md">
                      <div class="bid">
                        <p class="price-tag">
                          {{ Math.round(auc.bidsLeft) }} €
                        </p>
                        <p class="golden">Bids Left</p>
                      </div>
                    </div>
                  </div>
                  <span class="text-uppercase font-12 opacity-9"
                    >Payment Accepted</span
                  >
                  <img src="../assets/bit111.png" alt="" />
                  <small class="green-color q-pb-sm">BitBid</small>
                  <router-link :to="{ path: '/payment' }" exact>
                    <button class="btn">Place bid to win</button></router-link
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
export default {
  data() {
    return {
      auctions: null,
      selectedAuction: null
    };
  },
  methods: {
    getAuctions() {
      this.$axios
        .get("http://localhost:4000/auctions")
        .then(response => {
          this.auctions = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectAuction(id) {
      this.selectedAuction = this.auctions.find(item => item.id === id);
    },
    getValue(value) {
      return value === 0 ? "No" : "Yes";
    }
  },
  beforeMount() {
    this.getAuctions();
  }
};
</script>

<style scoped>
.input1 {
  background: url("../assets/Field_1.png");
  height: 49px;
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
}
::placeholder {
  color: #fff;
}

.input2 {
  background: url("../assets/Field_2.png");
  height: 49px;
  width: 465px;
  display: flex;
  align-items: center;
  justify-content: center;
}
input {
  background: none;
  border: none;
  color: #fff;
  outline: none;
}

#input1 {
  width: 300px;
}
#input2 {
  width: 435px;
}
form {
  background: url("../assets/bckg_form.png") no-repeat, center, center;
  height: 132px;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-position: center;
}
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

.bid {
  background: url("../assets/C2.png") no-repeat, center, center;
  height: 60px;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
}
.price {
  background: url("../assets/C1.png") no-repeat, center, center;
  height: 60px;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
}
.slider {
  background: url("../assets/Slider.png") no-repeat, center;
  height: 361px;
  background-size: contain;
  width: auto;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.slide-content {
  max-width: 40%;
}

.package-block {
  background: url("../assets/Caseta_Lot.png") no-repeat center center;
  background-size: contain;
  display: flex;
  align-items: center;
  height: 593px;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin: 50px 15px 30px 0;
}
.btn {
  background-image: url("../assets/auc-but.png");
  width: 240px;
}
</style>
