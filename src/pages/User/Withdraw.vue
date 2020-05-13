<template>
  <div>
    <img
      class="q-pb-lg title"
      src="../../assets/user/Title_withdraw.png"
      alt="Transaction"
    />
    <div class="row">
      <div class="col-12">
        <div class="table-block">
          <table class="table table-striped">
            <thead class="t-head">
              <tr class="t-row bg-blue py-2">
                <td class="cell border-top-0 KRS-color text-center w-20">
                  Currency
                </td>
                <td class="cell border-top-0 KRS-color text-center w-20">
                  Withdraw
                </td>
                <td class="cell border-top-0 KRS-color text-center w-20">
                  Withdraw Amount
                </td>
                <td
                  class="cell border-top-0 KRS-color text-right"
                  style="padding-right: 75px"
                >
                  Withdraw Transactions
                </td>
              </tr>
            </thead>
            <tbody class="t-body border-left-0 border-right-0">
              <tr class="t-row py-1">
                <td class="cell border-top-0 text-green text-center">
                  <div class="flex-center">
                    <img
                      class="q-mr-sm"
                      src="../../assets/user/Btc.png"
                      alt=""
                    />
                    BTC
                  </div>
                </td>
                <td class="cell border-top-0 text-white text-center">
                  <q-checkbox :value="true" />
                </td>

                <td class="cell border-top-0 text-white text-center">
                  0
                </td>
                <td class="cell border-top-0 text-white text-right">
                  <button class="btn q-mt-lg">View Transaction</button>
                </td>
              </tr>
              <tr class="t-row py-1">
                <td class="cell border-top-0  text-blue text-center">
                  <div class="flex-center">
                    <img
                      class="q-mr-sm"
                      src="../../assets/user/Eth.png"
                      alt=""
                    />
                    ETH
                  </div>
                </td>
                <td class="cell border-top-0 text-white text-center">
                  <q-checkbox :value="true" />
                </td>
                <td class="cell border-top-0 text-white text-center">
                  0
                </td>
                <td class="cell border-top-0 text-white text-right">
                  <button class="btn">View Transaction</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p class="bottom-text q-pt-xl">
      Wincoins is a "Highest Unique Bid" Auction where you can win Bitcoin at a
      fraction of its market value
    </p>
  </div>
</template>

<script>
export default {
  name: "transaction"
};
</script>

<style scoped>
.table-block {
  background: url("../../assets/user/Bg_withdraw.png") no-repeat, center, center;
  min-height: 286px;
  background-size: auto;
}

.btn {
  background-image: url("../../assets/But_Bid.png");
  width: 300px;
}
</style>
