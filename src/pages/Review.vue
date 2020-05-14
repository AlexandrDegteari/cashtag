<template>
  <div>
    <h2>Nice to meet you in our restaurant</h2>
    <p>Please make a review for our restaurant and take your free coffee</p>
    <router-link :to="{ path: '/Voucher' }" exact tag="li" active-class="active"
      >Profile</router-link
    >
    <button class="btn">
      Make review now!
    </button>
  </div>
</template>

<script>
export default {
  name: "Review"
};
</script>

<style scoped></style>
