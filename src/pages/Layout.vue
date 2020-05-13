<template>
  <div>
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>
<script>
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
export default {
  name: "layout",
  components: { AppFooter, AppHeader }
};
</script>

<style scoped></style>
