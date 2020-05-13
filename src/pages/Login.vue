<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl">
          <div class="form relative-position">
            <form @submit.prevent="loginFormSubmit">
              <h2 class="q-pt-md">Login</h2>
              <div class="input input1 q-mb-sm">
                <input
                  v-model="username"
                  id="input1"
                  type="text"
                  placeholder="E - mail"
                />
                <label for="input1"></label>
              </div>
              <div class="input input2 q-mb-sm">
                <input
                  id="input2"
                  type="password"
                  v-model="password"
                  placeholder="Password"
                />
                <label for="input2"></label>
              </div>
              <div class="buttons">
                <button class="btn">Login</button>
                <!--                <router-link-->
                <!--                  :to="{ path: '/register' }"-->
                <!--                  exact-->
                <!--                  active-class="active"-->
                <!--                  ><button onclick="prevent()" class="btn">-->
                <!--                    Sign Up-->
                <!--                  </button></router-link-->
                <!--                >-->
              </div>
              <div class="forgot">
                <div>
                  <q-checkbox size="sm" :value="true" />
                  <label>Remember me</label>
                </div>
                <a href="#">Forgot Username / Password</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import store from "../store/modules/auth";

export default {
  data() {
    return {
      username: null,
      password: null,
      error: null,
      store: store.getters
    };
  },
  methods: {
    loginFormSubmit() {
      if (this.username.length === 0 || this.password.length === 0) {
        return;
      }

      const user = {
        username: this.username,
        password: this.password
      };

      this.$store
        .dispatch("authRequest", user)
        .then(() => {
          this.$router.push("/");
          if (this.error) {
            this.error = null;
          }
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.password = null;
        });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 14px;
}
.forgot {
  display: flex;
  justify-content: space-between;
  /*min-width: 320px;*/
  align-items: center;
  font-size: 10px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}

::placeholder {
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center;
  padding: 20px;
}
</style>
