<template>
  <q-layout view="hHh lpR fFf" style="min-height:0;">
    <q-header elevated class="bg-primary text-white" height-hint="200">
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ path: '/' }" exact active-class="active">
            <img
              class="logo"
              src="../assets/cashtag.svg"
              width="250px"
              alt="cashtag"
            />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs
        v-if="this.$route.name !== 'review' && this.$route.name !== 'voucher'"
        align="right"
      >
        <q-route-tab
          v-if="isLoggedIn()"
          to="/profile"
          exact
          active-class="active"
          label="Profile"
        >
        </q-route-tab>
        <q-route-tab
          to="/restaurants"
          exact
          active-class="active"
          label="Restaurants"
        >
        </q-route-tab>
        <q-route-tab
          v-if="!isLoggedIn()"
          to="/login"
          label="Login"
          exact
          active-class="active"
        >
        </q-route-tab>
        <q-route-tab
          v-if="!isLoggedIn()"
          to="/register"
          exact
          active-class="active"
          label="Register"
        >
        </q-route-tab>
        <q-tab v-if="isLoggedIn" @click="logout" label="Log out"> </q-tab>
      </q-tabs>
    </q-header>
  </q-layout>
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
  }
};
</script>

<style scoped></style>
