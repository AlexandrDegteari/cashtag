<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl ">
          <img
            class="q-mb-xl title"
            src="../assets/Title_payment.png"
            alt="Transaction"
          />
          <div class="row justify-center">
            <div class="col-3">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/bit_bid.png" alt="" />
                <h2>Bit Bid</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
              </div>
            </div>
            <div class="col-3">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/eth_bid.png" alt="" />
                <h2>Either Bid</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
              </div>
            </div>
            <div class="col-3">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/elt_bid.png" alt="" />
                <h2>Elt Credits</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
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
                  <tbody class="t-body border-left-0 border-right-0">
                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>

                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                    <tr class="t-row py-1 border-bottom-blue">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                    <tr class="t-row py-1">
                      <td
                        class="cell border-top-0 d-flex justify-content-center text-white"
                      >
                        1
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        1.10.2019
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        23,232,147.57
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        BTC
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center">
                        Package Exclusive
                      </td>
                      <td class="cell border-top-0 text-white text-center"></td>
                    </tr>
                  </tbody>
                </table>
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
  name: "profile"
};
</script>

<style scoped>
h2 {
  font-size: 18px;
}
button {
  font-size: 11px;
}
.pack-block {
  background: url("../assets/small/payment_casseta.png") no-repeat center center;
  background-size: contain;
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-right: 15px;
  margin-bottom: 30px;
  height: 320px;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}
</style>
