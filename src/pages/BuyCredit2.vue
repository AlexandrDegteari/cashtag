<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl ">
          <img
            class="q-mb-lg q-mt-lg"
            src="../assets/user/buy.png"
            alt="Transaction"
          />
          <img
            class="q-mb-xl title"
            src="../assets/user/title_buy.png"
            alt="Transaction"
          />
          <div class="form relative-position">
            <form action="">
              <span>You Pay</span>
              <div class="input">
                <input
                  id="input1"
                  class="form-control credits-to-buy"
                  v-model="amount"
                  type="text"
                  name="amount"
                  placeholder="Enter amount of Bitcoin"
                  required=""
                  @change="getConvert"
                />
                <label for="input1">Bitcoin</label>
              </div>
              <span>You Get</span>

              <div class="input">
                <input
                  id="credits"
                  class="form-control"
                  placeholder="Enter amount of BitBid"
                  type="text"
                  v-model="convert"
                  name="credits"
                  required=""
                  @change="getAmount"
                />
                <label for="credits">BidBid</label>
              </div>

              <router-link :to="{ path: '/buy-credit' }" exact
                ><button @click="postAmount" class="btn search">
                  Next
                </button></router-link
              >
              <p class="text-success" v-if="successAmount">Success!</p>
            </form>
          </div>
          <div class="d-flex q-mt-lg">
            <p class="text-blue" style="width: 386px;">
              ESTIMATED ARRIVAL 5-30min
            </p>
            <div
              class="w-100 border-bottom-blue"
              style="margin-bottom: 10px"
            ></div>
          </div>
          <p class="bottom-text q-pt-xl">
            Wincoins is a "Highest Unique Bid" Auction where you can win Bitcoin
            at a fraction of its market value
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      convert: null,
      wallets: null,
      successAmount: false
    };
  },
  methods: {
    getAmount() {
      this.amount = this.convert / 10000;
    },
    getConvert() {
      this.convert = this.amount * 10000;
    },
    postAmount() {
      this.$axios
        .post("http://localhost:4000/wallets")
        .then(response => {
          this.wallets = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
    // register() {
    //   const convert = this.convert;
    //   this.$store
    //     .dispatch("authRegister", convert)
    //     .then(() => {
    //       this.errors = null;
    //       this.successAmount = true;
    //       setTimeout(() => {
    //         this.$router.push("/login");
    //       }, 2500);
    //     })
    //     .catch(() => {});
    //   // .catch(error => {
    //   //   this.errors = error.response.data;
    //   // });
    // }
  }
};
</script>

<style scoped>
.bottom-text {
  color: #6295d6;
  font-size: 27px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.input {
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
input {
  background: none;
  border: none;
  color: #fff;
  outline: none;
  padding-left: 15px;
  width: 300px;
}

label {
  text-align: right;
  padding-right: 15px;
  color: #429dff;
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

.btn.search {
  background-image: url("../assets/Search_but.png");
  height: 64px;
  width: 160px;
  background-size: contain;
}
</style>
