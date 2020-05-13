<template>
  <div>
    <div v-if="wallets">
      <div class="row" v-for="(wal, key) in wallets" :key="key">
        <div class="col-sm-10 col-md-6">
          <div class="left-block">
            <img class="q-pa-lg" src="../../assets/small/bit_bid.png" alt="" />
            <div class="text-block">
              <h2 class="large">BITBID</h2>
              <p class="color-blue q-pb-sm font-18">Balance:</p>
              <p class="text-white font-18 font-bold">{{ wal.BTC }} Credits</p>
            </div>
          </div>
        </div>
        <div class="col-sm-10 col-md-6">
          <div class="right-block">
            <div class="text-block">
              <h2 class="large">ETHERBID</h2>
              <p class="color-blue q-pb-sm font-18">Balance:</p>
              <p class="text-white font-18 font-bold">{{ wal.ETH }} Credits</p>
            </div>
            <img class="q-pa-lg" src="../../assets/small/eth_bid.png" alt="" />
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
                <td class="cell border-top-0 KRS-color text-center">
                  Date & Time
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Description
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Debit
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Credit
                </td>
                <td class="cell border-top-0 KRS-color text-center">
                  Status
                </td>
                <td class="cell border-top-0 KRS-color text-center"></td>
              </tr>
            </thead>
            <tbody
              v-if="transactions"
              class="t-body border-left-0 border-right-0"
            >
              <tr
                v-for="(trans, key) in transactions"
                :key="key"
                class="t-row py-1 border-bottom-blue"
              >
                <td
                  class="cell border-top-0 d-flex justify-content-center text-white"
                >
                  {{ trans.number }}
                </td>
                <td class="cell border-top-0 text-white text-center">
                  {{ trans.data }}
                </td>
                <td class="cell border-top-0 text-white text-center">
                  {{ trans.description }}
                </td>
                <td class="cell border-top-0 text-white text-center">
                  {{ trans.credit }}
                </td>
                <td class="cell border-top-0 text-white text-center">
                  {{ trans.debit }}
                </td>
                <td class="cell border-top-0 text-white text-center">
                  {{ trans.status }}
                </td>
                <td class="cell border-top-0 text-white text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      transactions: null,
      wallets: null,
      userId: this.decode()
    };
  },
  methods: {
    getTransactions() {
      this.$axios
        .get("http://localhost:4000/transactions")
        .then(response => {
          this.transactions = response.data;
          this.transactions = response.data.filter(
            item => item.userId === this.userId
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    getWallets() {
      this.$axios
        .get("http://localhost:4000/wallets")
        .then(response => {
          this.wallets = response.data;
          this.wallets = response.data.filter(
            item => item.userId === this.userId
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    decode() {
      return jwt_decode(localStorage.getItem("access_token")).sub;
    }
  },
  beforeMount() {
    this.getTransactions();
    this.getWallets();
  }
};
</script>

<style scoped>
.color-blue {
  color: #3788e0;
}

.left-block {
  background: url("../../assets/small/left.png") no-repeat center center;
  /*background-size: contain;*/
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-right: 15px;
  margin-bottom: 30px;
  /*height: 318px;*/
  justify-content: space-around;
}

.right-block {
  background: url("../../assets/small/right.png") no-repeat center center;
  /*background-size: contain;*/
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: space-around;
  margin-left: 15px;
  /*height: 318px;*/
}

.text-block {
  padding-left: 40px;
}

@media (max-width: 1024px) {
  .left-block,
  .right-block {
    margin: 0;
    padding: 50px;
  }
}
@media (max-width: 660px) {
  .left-block,
  .right-block {
    padding: 20px;
  }
}
</style>
