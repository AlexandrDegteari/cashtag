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
          <div class="back">
            <div class="row h-100">
              <div class="col-3 border-right-blue h-100 flex-center">
                <img src="../assets/user/Cod.png" alt="" />
              </div>
              <div class="col-6 border-right-blue h-100 flex-center flex-col">
                <p class="description">
                  Make sure you only send <br />
                  Bitcoin (BTC) to this address!
                </p>
                <div class="input1 q-mt-lg">
                  <input
                    id="input1"
                    value="cshcech54355bhbhxxxxx///3e28324328"
                    type="text"
                  />
                  <label for="input1">Copy</label>
                </div>
              </div>
              <div class="col-3 h-100 flex-center flex-col">
                <p class="description ">
                  Payment <br />
                  information
                </p>
                <br />
                <br />

                <p class="blue-text">Total Amount To Send:</p>
                <p class="description">
                  2.00000000000
                </p>
              </div>
            </div>
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
  name: "profile"
};
</script>

<style scoped>
.description {
  font-size: 20px;
  text-align: center;
  line-height: 36px;
  opacity: 0.9;
}
.back {
  background: url("../assets/user/bg_buy.png") no-repeat center center;
  background-size: contain;
  height: 276px;
}

.input1 {
  background: url("../assets/user/buy_input.png");
  height: 64px;
  width: 488px;
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

#input1 {
  width: 410px;
  color: #429dff;
}
.bottom-text {
  color: #6295d6;
  font-size: 27px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}

p.blue-text {
  font-size: 20px;
  letter-spacing: 1.2px;
}
</style>
