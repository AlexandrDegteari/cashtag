<template>
  <q-layout
    v-if="
      this.$route.name !== 'review' &&
        this.$route.name !== 'voucher' &&
        !isGuest()
    "
    view="hHh lpR fFf"
    style="min-height:0;"
  >
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

      <q-tabs align="right">
        <q-route-tab
          v-if="isLoggedIn()"
          to="/profile"
          exact
          active-class="active"
          label="Profil"
        >
        </q-route-tab>
        <q-route-tab
          v-if="isAdmin()"
          to="/restaurants"
          exact
          active-class="active"
          label="Restaurants"
        >
        </q-route-tab>
        <q-route-tab
          v-if="isLoggedIn() && !isAdmin()"
          to="/reststatistics"
          exact
          active-class="active"
          label="Statistik"
        >
        </q-route-tab>
        <q-route-tab
          v-if="isLoggedIn() && isAdmin()"
          to="/statistics"
          exact
          active-class="active"
          label="Statistik"
        >
        </q-route-tab>
        <q-route-tab
          v-if="isLoggedIn() && !isAdmin()"
          :to="{
            name: 'guest-table',
            params: {
              userId: this.getUserId()
            }
          }"
          exact
          active-class="active"
          label="Guest Table"
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
        <q-tab
          v-if="isAdmin()"
          @click="addRest = true"
          exact
          active-class="active"
          label="Restaurant hinzufügen"
        >
        </q-tab>
        <q-tab v-if="isLoggedIn()" @click="logout" label="Log out"> </q-tab>
      </q-tabs>
      <q-dialog persistent v-model="addRest">
        <register />
      </q-dialog>
    </q-header>
  </q-layout>
</template>
<script>
import Register from "../pages/Register";

export default {
  name: "AppHeader",
  components: { Register },
  data() {
    return {
      addRest: false,
      userId: this.getUserId()
    };
  },
  methods: {
    isLoggedIn() {
      return this.$store.state.auth.access_token;
    },
    isAdmin() {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).admin;
      }
    },
    getUserId() {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))._id;
      }
    },
    isGuest() {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).guest;
      }
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
