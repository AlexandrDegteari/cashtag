<template>
  <div>
    <img
      class="q-pb-lg title"
      src="../../assets/user/Title_wallet.png"
      alt="Transaction"
    />
    <div class="row">
      <div class="col-12">
        <div class="table-block">
          <table class="table table-striped">
            <tbody class="t-body border-left-0 border-right-0">
              <tr class="t-row py-1">
                <td class="cell border-top-0 text-green text-center w-10">
                  <div class="flex-center">
                    <img
                      class="q-mr-sm"
                      src="../../assets/user/Btc.png"
                      alt=""
                    />
                    BTC
                  </div>
                </td>
                <td class="cell border-top-0 text-white w-40">
                  <div class="input">
                    <input id="input1" type="text" />
                    <label for="input1"></label>
                  </div>
                </td>
                <td class="cell border-top-0 text-white text-center">
                  <button class="btn">Update Adress</button>
                </td>
                <td class="cell border-top-0 text-white text-center w-10">
                  Status
                </td>
                <td class="cell border-top-0 blue-text text-center w-17">
                  Not Completed
                </td>
              </tr>
              <tr class="t-row py-1">
                <td class="cell border-top-0  text-blue text-center w-17">
                  <div class="flex-center">
                    <img
                      class="q-mr-sm"
                      src="../../assets/user/Eth.png"
                      alt=""
                    />
                    ETH
                  </div>
                </td>
                <td class="cell border-top-0 text-white">
                  <div class="input">
                    <input id="input2" type="text" />
                    <label for="input2"></label>
                  </div>
                </td>
                <td class="cell border-top-0 text-white text-center">
                  <button class="btn">Update Adress</button>
                </td>
                <td class="cell border-top-0 text-white text-center">
                  Status
                </td>
                <td class="cell border-top-0 blue-text text-center w-18">
                  Not Completed
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
export default {};
</script>

<style scoped>
.table-block {
  background: url("../../assets/user/Bg_wallet.png") no-repeat, center, center;
  background-size: auto;
  min-height: 190px;
}
table {
  margin: 0;
}

.btn {
  background-image: url("../../assets/user/But_wallet.png");
  width: 232px;
}
.input {
  background: url("../../assets/user/Bg_wallet_input.png");
  height: 49px;
  width: 405px;
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
}
</style>
