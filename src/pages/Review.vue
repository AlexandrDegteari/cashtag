<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="bg">
          <div class="container q-pt-xl">
            <h2>Nice to meet you in our restaurant</h2>
            <p>
              Please make a review for our restaurant and take your free coffee
            </p>
            <router-link
              :to="{ path: '/voucher' }"
              exact
              tag="li"
              active-class="active"
            >
              <button class="btn">
                Make review now!
              </button></router-link
            >
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Review"
};
</script>

<style scoped></style>
