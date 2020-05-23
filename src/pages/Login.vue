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

              <button class="btn full-width">Login</button>
              <!--                <router-link-->
              <!--                  :to="{ path: '/register' }"-->
              <!--                  exact-->
              <!--                  active-class="active"-->
              <!--                  ><button onclick="prevent()" class="btn btn-secondary">-->
              <!--                    Sign Up-->
              <!--                  </button></router-link-->
              <!--                >-->
              <button
                type="button"
                @click="forgot = true"
                class="btn btn-secondary full-width"
              >
                Passwort vergessen
              </button>

              <!--              <div class="forgot">-->
              <!--                <div>-->
              <!--                  <q-checkbox size="sm" :value="true" />-->
              <!--                  <label>Remember me</label>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="error mt-0" v-if="error">
                {{ error }}
              </div>
              <q-dialog v-model="forgot">
                <send-email />
              </q-dialog>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import store from "../store/modules/auth";
import SendEmail from "./SendEmail";
export default {
  components: { SendEmail },
  data() {
    return {
      email: null,
      password: null,
      error: null,
      forgot: false,
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
