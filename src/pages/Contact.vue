<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl">
          <div class="form relative-position">
            <form>
              <h2 class="q-pt-md">Contact Form</h2>
              <div class="input input1 q-mt-md q-mb-md">
                <input id="input1" type="text" placeholder="Name" />
                <label for="input1"></label>
              </div>
              <div class="input input3 q-mb-md">
                <input id="input2" type="text" placeholder="E - mail" />
                <label for="input2"></label>
              </div>
              <div class="input input3 q-mb-md">
                <input
                  id="input3"
                  type="text"
                  placeholder="Enter your message"
                />
                <label for="input3"></label>
              </div>
              <button class="btn text-center">Send</button>
            </form>
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
.forgot {
  display: flex;
  justify-content: space-between;
  min-width: 500px;
  align-items: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 5px 0 8px;
}
.input1 {
  background: url("../assets/login-input1.png");
  height: 74px;
  width: 496px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
::placeholder {
  color: #fff;
}

.input {
  height: 74px;
  width: 496px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
::placeholder {
  color: #fff;
}

.input1 {
  background: url("../assets/login-input1.png");
}
.input2 {
  background: url("../assets/login-input2.png");
}
.input3 {
  background: url("../assets/login-input3.png");
}
.input4 {
  background: url("../assets/login-input4.png");
}

input {
  background: none;
  border: none;
  color: #fff;
  outline: none;
}

/*#input1 {*/
/*  width: 400px;*/
/*  text-align: center;*/
/*}*/
/*#input2 {*/
/*  width: 400px;*/
/*  text-align: center;*/
/*}*/
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  padding: 20px;
}
.form {
  padding: 20px 0 72px;
}
</style>
