<template>
  <q-layout view="hHh lpR fFf" style="min-height:200px;">
    <q-header elevated class="bg-primary text-white" height-hint="200">
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ path: '/' }" exact active-class="active">
            <img class="logo" src="../assets/Cashtag.png" />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab to="/profile" label="Profile">
          <router-link
            :to="{ name: 'profile' }"
            v-if="isLoggedIn()"
            exact
            active-class="active"
          >
          </router-link>
        </q-route-tab>
        <q-route-tab to="/restaurants" label="Restaurants">
          <router-link
            :to="{ name: 'restaurants' }"
            exact
            active-class="active"
          >
          </router-link>
        </q-route-tab>
        <q-route-tab to="/login" label="Login">
          <router-link
            :to="{ name: 'login' }"
            v-if="!isLoggedIn()"
            exact
            active-class="active"
          >
          </router-link>
        </q-route-tab>
        <q-route-tab to="/register" label="Register">
          <router-link
            :to="{ name: 'register' }"
            v-if="!isLoggedIn()"
            exact
            active-class="active"
          >
          </router-link>
        </q-route-tab>
      </q-tabs>
    </q-header>
    <!--
    <q-page-container>
      <router-view />
    </q-page-container>
    -->
  </q-layout>
  <!--
  <div>
    <header>
      <div class="container">
        <router-link :to="{ path: '/' }" exact active-class="active">
          <img class="logo" src="../assets/Cashtag.png" />
        </router-link>
      </div>
      <div class="container-fluid">
        <div class="nav navbar-nav navbar-right">
          <ul class="nav-bar">
            <li class="hide-sp">
              <router-link :to="{ path: '/' }" exact active-class="active"
                >Home</router-link
              >
            </li>
            <li class="hide-sp">
              <router-link
                :to="{ name: 'profile' }"
                v-if="isLoggedIn()"
                exact
                active-class="active"
              >
                Profile</router-link
              >
            </li>
            <li class="hide-sp">
              <router-link
                :to="{ name: 'restaurants' }"
                exact
                active-class="active"
                >Restaurants</router-link
              >
            </li>
            <li class="hide-sp">
              <router-link
                :to="{ name: 'login' }"
                v-if="!isLoggedIn()"
                exact
                active-class="active"
              >
                Login</router-link
              >
            </li>
            <li class="hide-sp">
              <router-link
                :to="{ name: 'register' }"
                v-if="!isLoggedIn()"
                exact
                active-class="active"
              >
                Register</router-link
              >
            </li>
            <li>
              <div v-if="isLoggedIn()" @click="logout"><a>Log out</a></div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
  -->
</template>
<script>
export default {
  name: "AppHeader",
  methods: {
    isLoggedIn() {
      return this.$store.state.auth.access_token;
    },
    logout() {
      this.$store.dispatch("authLogout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.user.profile;
    }
  }
};
</script>

<style scoped></style>
