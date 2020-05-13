<template>
  <div class="wrapper">
    <main class="user">
      <div class="bg">
        <div class="container q-pt-lg ">
          <div v-if="isLoggedIn" class="nav-bar">
            <ul class="nav">
              <router-link
                :to="{ path: '/' }"
                exact
                tag="li"
                active-class="active"
                >Profile</router-link
              >
              <router-link
                :to="{ path: '/user-transactions' }"
                exact
                tag="li"
                active-class="active"
                >Transaction</router-link
              >
              <router-link
                :to="{ path: '/user-auctions' }"
                exact
                tag="li"
                active-class="active"
                >Auctions</router-link
              >
              <router-link
                :to="{ path: '/user-wallet' }"
                exact
                tag="li"
                active-class="active"
                >Wallet Addresses</router-link
              >
              <router-link
                :to="{ path: '/user-withdraw' }"
                exact
                tag="li"
                active-class="active"
                >Withdraw</router-link
              >
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  methods: {
    isLoggedIn() {
      return this.$store.state.auth.access_token;
    },
    decode() {
      return jwt_decode(localStorage.getItem("access_token")).sub;
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.user.profile;
    }
  },
  mounted() {
    console.log(this.decode());
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #429dff;
  list-style: none;
  font-weight: bold;
}

.nav li {
  background: url("../../assets/menu.png") no-repeat, center;
  width: 100%;
  padding: 6px 30px 10px 10px;
  margin-left: -30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
}
.nav li:last-child {
  background: url("../../assets/menu-last.png") no-repeat, center;
}

.nav li.active,
.nav li:hover {
  background: url("../../assets/menu-active.png") no-repeat, center;
  color: #0b3172;
}

.nav-bar {
  margin-bottom: 50px;
  position: relative;
  margin-left: 30px;
}

@media (max-width: 1200px) {
  .nav-bar {
    display: none;
  }
}
</style>
