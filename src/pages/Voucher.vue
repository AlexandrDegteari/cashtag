<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="bg">
          <div class="container q-pt-xl">
            <img :src="this.restaurantAvatar" alt="" />
            <h2>
              Thank you for rating our restaurant
              <b>{{ this.restaurantName }}</b
              >!
            </h2>
            <p>Show this message to your waiter and get your free coffee!</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Voucher",
  data() {
    return {
      restaurantName: this.$route.params.restaurantName
    };
  }
};
</script>

<style scoped></style>
