<template>
  <div>
    <footer>
      <div class="custom-container">
        <div class="row align-items-center flex justify-between">
          <!--          <div class="col-12 col-sm-6 col-md-6 col-lg-3 flex justify-center">-->
          <!--            <div class="social-links">-->
          <!--              <a href="#" class="call" target="_blank"></a>-->
          <!--              <a href="#" class="facebook" target="_blank"></a>-->
          <!--              <a href="#" class="twitter" target="_blank"></a>-->
          <!--              <a href="#" class="instagram" target="_blank"></a>-->
          <!--              <a href="#" class="youtube" target="_blank"></a>-->
          <!--            </div>-->
          <!--          </div>-->

          <div
            class="col-md-3 d-flex justify-content-center justify-content-sm-end py-2 py-lg-0 q-pr-md"
          >
            <router-link :to="{ path: '/' }" exact active-class="active">
              <img
                class="logo"
                src="../assets/cashtag-black.svg"
                width="200px"
              />
            </router-link>
          </div>
          <div class="col-md-9 text-center text-sm-left q-pr-md">
            <ul class="d-flex justify-end m-0 wrap footer-menu">
              <li class="list-inline-item mr-0_1">
                <a href="#" target="_blank">
                  Privacy Policy
                </a>
                <span>|</span>
              </li>
              <li class="list-inline-item mr-0_1">
                <a href="#" target="_blank"> Cookie Policy</a>
                <span>|</span>
              </li>
              <li class="list-inline-item mr-0_1">
                <a href="#" target="_blank"> Terms &amp; Conditions</a>
              </li>
            </ul>

            <span class="copy d-block text-right">
              Für Fragen und Feedback: info@cashtag.com </span
            >
            <span class="copy d-block text-right"
              >2020 © Cashtag - All Rights Reserved.</span
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.social-links a {
  background: url("../assets/sprite-social.png");
  background-position-x: 0;
  background-position-y: center;
  height: 40px;
  width: 40px;
  display: inline-block;
}

.social-links .facebook {
  background-position-x: -38px;
}

.social-links .twitter {
  background-position-x: -77px;
}

.social-links .instagram {
  background-position-x: -123px;
}

.social-links .youtube {
  background-position-x: -169px;
}

.age .icon {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border: 1px solid #fff;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.age .icon .restriction {
  font-size: 15px;
}

ul li span {
  margin: 0 5px;
}
a {
  text-decoration: none;
}
a:hover {
  opacity: 0.8;
}
@media (max-width: 1024px) {
  .copy {
    text-align: center;
  }
  .footer-menu {
    margin-top: 10px;
  }
}
@media (max-width: 400px) {
  footer {
    font-size: 10px;
  }
}
</style>
