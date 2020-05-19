<template>
  <div class="wrapper">
    <main>
      <div class="bg">
        <div class="container q-pt-xl">
          <div class="form relative-position">
            <form @submit.prevent="loginFormSubmit">
              <h1 class="q-pt-md">Login</h1>
              <div class="input input1 q-mb-sm">
                <input
                  v-model="email"
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
                <router-link
                  :to="{ path: '/register' }"
                  exact
                  active-class="active"
                  ><button onclick="prevent()" class="btn btn-secondary">
                    Sign Up
                  </button></router-link
                >
              </div>
              <!--              <div class="forgot">-->
              <!--                <div>-->
              <!--                  <q-checkbox size="sm" :value="true" />-->
              <!--                  <label>Remember me</label>-->
              <!--                </div>-->
              <!--                <a href="#">Forgot Username / Password</a>-->
              <!--              </div>-->
              <div class="error mt-0" v-if="error">
                {{ error }}
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
      email: null,
      password: null,
      error: null,
      store: store.getters
    };
  },
  methods: {
    loginFormSubmit() {
      if (!this.email || !this.password) {
        this.error = "Please fill all the fields";
        return;
      }

      const user = {
        email: this.email,
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
.forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 225px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center;
  padding: 20px;
}
</style>
