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
          <div class="row">
            <div class="col-4">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/bit_bid.png" alt="" />
                <h2>Bit Bid</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
              </div>
            </div>
            <div class="col-4">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/eth_bid.png" alt="" />
                <h2>Either Bid</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
              </div>
            </div>
            <div class="col-4">
              <div class="pack-block">
                <img class="q-pb-sm" src="../assets/small/elt_bid.png" alt="" />
                <h2>Elt Credits</h2>
                <router-link :to="{ path: '/buy-credit2' }" exact
                  ><button class="btn search">Buy Credits</button></router-link
                >
              </div>
            </div>
          </div>
          <p class="bottom-text q-mt-md">
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
  name: "profile"
};
</script>

<style scoped>
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
