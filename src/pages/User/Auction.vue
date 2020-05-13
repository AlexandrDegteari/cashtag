<template>
  <div class="container q-pt-xl ">
    <div class="packages">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="pack-block border-right-blue">
            <img class="q-pb-sm" src="../../assets/bit.png" alt="" />
            <div class="text-center">
              <h2>1 Bitcoin</h2>
              <p class="text-blue">Market Price: 4200 €</p>
              <p class="q-pt-lg">Place Your Bid With</p>
              <div class="flex-between q-pt-md">
                <div class="d-flex q-pr-lg">
                  <span>5</span>
                  <div class="flex-col q-ml-md q-mr-md">
                    <img src="../../assets/bit111.png" alt="" />
                    <small class="green-color q-pt-sm">BitBid</small>
                  </div>
                  <span>0</span>
                </div>
                <div class="d-flex">
                  <span>5</span>
                  <div class="flex-col q-ml-md q-mr-md">
                    <img src="../../assets/user/Eth.png" alt="" />
                    <small class="violet-text q-pt-sm">EtherBid</small>
                  </div>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 sm-w-100">
          <div class="flex-center h-100">
            <div class="text-center">
              <h2>Enter Your Bid</h2>
              <div class="blocks">
                <div class="price flex-col">
                  <input
                    class="input-bid"
                    type="text"
                    v-model="euro"
                    placeholder="Enter Value"
                  />
                  <span class="golden">euro</span>
                </div>
                <div class="price flex-col">
                  <input
                    class="input-bid"
                    type="text"
                    v-model="cents"
                    placeholder="Enter Value"
                  />
                  <span class="golden">cents</span>
                </div>
              </div>
              <button @click="postAmount" class="btn">Enter your bid</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-block">
      <div class="row text-center justify-center">
        <div class="col-md-3 col-sm-6 q-pb-md flex-center">
          <div class="info">
            <p>-- : -- : --</p>
            <span class="golden">Time Left</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 q-pb-md flex-center">
          <div class="info">
            <p>10.00</p>
            <span class="golden">Max-Price</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 q-pb-md flex-center">
          <div class="info">
            <p>5.00</p>
            <span class="golden">Credits / Bid</span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 q-pb-md flex-center">
          <div class="info">
            <p>1100</p>
            <span class="golden">Bids Left</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-block">
          <table class="table table-striped">
            <thead class="t-head">
              <tr class="t-row bg-blue py-2">
                <td class="cell border-top-0 KRS-color text-center">
                  #
                </td>
                <td class="cell border-top-0 KRS-color text-left">
                  Name
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Country
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  City
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Bid
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Position
                </td>
              </tr>
            </thead>
            <tbody class="t-body border-left-0 border-right-0">
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1 border-bottom-blue">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
              <tr class="t-row py-1">
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  1
                </td>
                <td class="cell border-top-0 text-white text-left">
                  Martha Rostovschy
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Poland
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Rujeck
                </td>
                <td class="cell border-top-0 text-white text-center">
                  22
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Timestamp
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Position
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      euro: null,
      cents: null,
      bid: this.euro + "," + this.cents,
      wallets: null,
      successAmount: false
    };
  },
  methods: {
    postAmount() {
      this.$axios
        .post("http://localhost:4000/wallets", this.bid)
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
input.input-bid {
  background: none;
  text-align: center;
  border: none;
  color: #fff;
  font-weight: bold;
}
.info {
  background: url("../../assets/Window.png") no-repeat, center;
  height: 66px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  justify-content: center;
}
.info-block {
  background: url("../../assets/Form_2.png") no-repeat, center;
  min-height: 132px;
  background-size: contain;
  margin: 30px 0;
  padding: 30px 20px;
}
.price {
  background: url("../../assets/Euro_Bcg.png") no-repeat, center;
  height: 64px;
  width: 182px;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.blocks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.packages {
  background: url("../../assets/bg_Bid.png") no-repeat, center;
  min-height: 276px;
}

.pack-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  padding: 0 30px;
  margin: 10px 0;
}

.btn {
  background-image: url("../../assets/But_Bid.png");
  width: 392px;
  margin: 18px 0 0;
}

span {
  font-size: 18px;
  font-weight: bold;
  padding-top: 5px;
}

p {
  font-size: 20px;
}
.table-block {
  background-size: auto;
  min-height: 450px;
}

@media (max-width: 1024px) {
  .info-block {
    background: none;
  }

  .packages {
    background: none;
    justify-content: space-around;
    padding: 0 30px 30px;
  }
  .border-right-blue {
    border: none;
  }
  .pack-block {
    justify-content: space-around;
    padding-bottom: 20px;
  }
}
@media (max-width: 768px) {
  .pack-block {
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 30px 30px;
  }
  .packages {
    justify-content: center;
  }
  .sm-w-100 {
    width: 100%;
  }
}
</style>
