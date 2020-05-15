<template>
  <div>
    <header>
      <div class="header-bg">
        <div class="container">
          <div class="nav">
            <router-link :to="{ path: '/' }" exact active-class="active">
              <h1 class="logo">Cashtag</h1></router-link
            >
            <ul class="nav-bar">
              <li class="hide-sp">
                <router-link :to="{ path: '/' }" exact active-class="active"
                  >Home</router-link
                >
              </li>
              <li class="hide-sp">
                <router-link
                  :to="{ name: 'search' }"
                  exact
                  active-class="active"
                  >Restaurants1</router-link
                >
              </li>
              <li class="hide-sp">
                <router-link
                  :to="{ name: 'restaurants' }"
                  exact
                  active-class="active"
                  >Restaurants2</router-link
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
              <!--              <li>-->
              <!--                <q-btn-dropdown-->
              <!--                  class="q-mr-xs q-ml-xs hide-sp"-->
              <!--                  v-if="isLoggedIn()"-->
              <!--                  :content-style="{ backgroundColor: '#063666' }"-->
              <!--                >-->
              <!--                  <template v-slot:label>-->
              <!--                    <img src="../assets/user/Man.png" alt="" />-->
              <!--                  </template>-->
              <!--                  <q-list>-->
              <!--                    <router-link-->
              <!--                      :to="{ path: 'user-auctions' }"-->
              <!--                      exact-->
              <!--                      active-class="active"-->
              <!--                    >-->
              <!--                      <q-item v-close-popup>-->
              <!--                        <q-item-section avatar>-->
              <!--                          <q-avatar>-->
              <!--                            <img src="../assets/user/Man.png" alt="" />-->
              <!--                          </q-avatar>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section>-->
              <!--                          <q-item-label>Profile</q-item-label>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section side> </q-item-section>-->
              <!--                      </q-item>-->
              <!--                    </router-link>-->
              <!--                    <router-link-->
              <!--                      :to="{ path: '/restaurants' }"-->
              <!--                      exact-->
              <!--                      active-class="active"-->
              <!--                    >-->
              <!--                      <q-item v-close-popup>-->
              <!--                        <q-item-section avatar>-->
              <!--                          <q-avatar>-->
              <!--                            <img src="../assets/user/coin.svg" alt="" />-->
              <!--                          </q-avatar>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section>-->
              <!--                          <q-item-label>Restaurants</q-item-label>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section side> </q-item-section>-->
              <!--                      </q-item>-->
              <!--                    </router-link>-->
              <!--                    <div @click="logout">-->
              <!--                      <q-item v-close-popup>-->
              <!--                        <q-item-section avatar>-->
              <!--                          <q-avatar>-->
              <!--                            <img src="../assets/user/logout.svg" alt="" />-->
              <!--                          </q-avatar>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section>-->
              <!--                          <q-item-label>Log out</q-item-label>-->
              <!--                        </q-item-section>-->
              <!--                        <q-item-section side> </q-item-section>-->
              <!--                      </q-item>-->
              <!--                    </div>-->
              <!--                  </q-list>-->
              <!--                </q-btn-dropdown>-->
              <!--              </li>-->
              <!--              <li>-->
              <!--                <q-btn-dropdown-->
              <!--                  class=" q-mr-xs q-ml-xs hide-sp"-->
              <!--                  :content-style="{ backgroundColor: '#063666' }"-->
              <!--                >-->
              <!--                  <template v-slot:label>-->
              <!--                    <img class="ava" src="../assets/lang/eng.png" alt="" />-->
              <!--                  </template>-->
              <!--                  <q-list>-->
              <!--                    <q-item clickable v-close-popup>-->
              <!--                      <q-item-section avatar>-->
              <!--                        <q-avatar>-->
              <!--                          <img-->
              <!--                            class="ava"-->
              <!--                            src="../assets/lang/Arab.png"-->
              <!--                            alt=""-->
              <!--                          />-->
              <!--                        </q-avatar>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section>-->
              <!--                        <q-item-label> Arabic</q-item-label>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section side> </q-item-section>-->
              <!--                    </q-item>-->
              <!--                    <q-item clickable v-close-popup>-->
              <!--                      <q-item-section avatar>-->
              <!--                        <q-avatar>-->
              <!--                          <img-->
              <!--                            class="ava"-->
              <!--                            src="../assets/lang/pers.png"-->
              <!--                            alt=""-->
              <!--                          />-->
              <!--                        </q-avatar>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section>-->
              <!--                        <q-item-label> Persian</q-item-label>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section side> </q-item-section>-->
              <!--                    </q-item>-->
              <!--                    <q-item clickable v-close-popup>-->
              <!--                      <q-item-section avatar>-->
              <!--                        <q-avatar>-->
              <!--                          <img class="ava" src="../assets/lang/tr.png" alt="" />-->
              <!--                        </q-avatar>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section>-->
              <!--                        <q-item-label> Turkish</q-item-label>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section side> </q-item-section>-->
              <!--                    </q-item>-->
              <!--                    <q-item clickable v-close-popup>-->
              <!--                      <q-item-section avatar>-->
              <!--                        <q-avatar>-->
              <!--                          <q-avatar>-->
              <!--                            <img-->
              <!--                              class="ava"-->
              <!--                              src="../assets/lang/chi.png"-->
              <!--                              alt=""-->
              <!--                            />-->
              <!--                          </q-avatar>-->
              <!--                        </q-avatar>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section>-->
              <!--                        <q-item-label> Chinese</q-item-label>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section side> </q-item-section>-->
              <!--                    </q-item>-->
              <!--                    <q-item clickable v-close-popup>-->
              <!--                      <q-item-section avatar>-->
              <!--                        <q-avatar>-->
              <!--                          <img-->
              <!--                            class="ava"-->
              <!--                            src="../assets/lang/eng.png"-->
              <!--                            alt=""-->
              <!--                          />-->
              <!--                        </q-avatar>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section>-->
              <!--                        <q-item-label> English</q-item-label>-->
              <!--                      </q-item-section>-->
              <!--                      <q-item-section side> </q-item-section>-->
              <!--                    </q-item>-->
              <!--                  </q-list>-->
              <!--                </q-btn-dropdown>-->
              <!--              </li>-->
            </ul>
            <!--            <q-btn-dropdown-->
            <!--              class="q-mr-xs q-ml-xs hide-pc q-mb-sm"-->
            <!--              :content-style="{ backgroundColor: '#063666' }"-->
            <!--              flat-->
            <!--              stretch-->
            <!--              dense-->
            <!--              dropdown-icon="none"-->
            <!--            >-->
            <!--              <q-list>-->
            <!--                <q-btn-dropdown-->
            <!--                  class=" q-mr-xs q-ml-xs "-->
            <!--                  :content-style="{ backgroundColor: '#063666' }"-->
            <!--                >-->
            <!--                  <template v-slot:label>-->
            <!--                    <img class="ava" src="../assets/lang/eng.png" alt="" />-->
            <!--                  </template>-->
            <!--                  <q-list>-->
            <!--                    <q-item clickable v-close-popup>-->
            <!--                      <q-item-section avatar>-->
            <!--                        <q-avatar>-->
            <!--                          <img-->
            <!--                            class="ava"-->
            <!--                            src="../assets/lang/Arab.png"-->
            <!--                            alt=""-->
            <!--                          />-->
            <!--                        </q-avatar>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section>-->
            <!--                        <q-item-label> Arabic</q-item-label>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section side> </q-item-section>-->
            <!--                    </q-item>-->
            <!--                    <q-item clickable v-close-popup>-->
            <!--                      <q-item-section avatar>-->
            <!--                        <q-avatar>-->
            <!--                          <img-->
            <!--                            class="ava"-->
            <!--                            src="../assets/lang/pers.png"-->
            <!--                            alt=""-->
            <!--                          />-->
            <!--                        </q-avatar>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section>-->
            <!--                        <q-item-label> Persian</q-item-label>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section side> </q-item-section>-->
            <!--                    </q-item>-->
            <!--                    <q-item clickable v-close-popup>-->
            <!--                      <q-item-section avatar>-->
            <!--                        <q-avatar>-->
            <!--                          <img class="ava" src="../assets/lang/tr.png" alt="" />-->
            <!--                        </q-avatar>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section>-->
            <!--                        <q-item-label> Turkish</q-item-label>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section side> </q-item-section>-->
            <!--                    </q-item>-->
            <!--                    <q-item clickable v-close-popup>-->
            <!--                      <q-item-section avatar>-->
            <!--                        <q-avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img-->
            <!--                              class="ava"-->
            <!--                              src="../assets/lang/chi.png"-->
            <!--                              alt=""-->
            <!--                            />-->
            <!--                          </q-avatar>-->
            <!--                        </q-avatar>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section>-->
            <!--                        <q-item-label> Chinese</q-item-label>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section side> </q-item-section>-->
            <!--                    </q-item>-->
            <!--                    <q-item clickable v-close-popup>-->
            <!--                      <q-item-section avatar>-->
            <!--                        <q-avatar>-->
            <!--                          <img-->
            <!--                            class="ava"-->
            <!--                            src="../assets/lang/eng.png"-->
            <!--                            alt=""-->
            <!--                          />-->
            <!--                        </q-avatar>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section>-->
            <!--                        <q-item-label> English</q-item-label>-->
            <!--                      </q-item-section>-->
            <!--                      <q-item-section side> </q-item-section>-->
            <!--                    </q-item>-->
            <!--                  </q-list>-->
            <!--                </q-btn-dropdown>-->
            <!--                <q-btn-dropdown-->
            <!--                  class="q-mr-xs q-ml-xs "-->
            <!--                  :content-style="{ backgroundColor: '#063666' }"-->
            <!--                >-->
            <!--                  <template v-slot:label>-->
            <!--                    <img src="../assets/Home_icon.png" alt="" />-->
            <!--                  </template>-->
            <!--                  <q-list>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Home_icon.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Home</q-item-label>-->
            <!--                        </q-item-section>-->

            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/auction' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Aucc.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Auction</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/auctions' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/2_Aucc.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Auctions</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/login' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <q-avatar>-->
            <!--                              <img src="../assets/man_1.png" alt="" />-->
            <!--                            </q-avatar>-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label> Login</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/register' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item clickable v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Man_2.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Register</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                  </q-list>-->
            <!--                </q-btn-dropdown>-->
            <!--                <q-btn-dropdown-->
            <!--                  class="q-mr-xs q-ml-xs"-->
            <!--                  :content-style="{ backgroundColor: '#063666' }"-->
            <!--                >-->
            <!--                  <template v-slot:label>-->
            <!--                    <img src="../assets/Man_2.png" alt="" />-->
            <!--                  </template>-->
            <!--                  <q-list>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: 'user-auctions' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Home_icon.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Profile</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/user-restaurants' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Aucc.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Restaurants</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/user-auctions' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/2_Aucc.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Auctions</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/user-wallet' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <q-avatar>-->
            <!--                              <img src="../assets/man_1.png" alt="" />-->
            <!--                            </q-avatar>-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label> Wallet Addresses</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                    <router-link-->
            <!--                      :to="{ path: '/user-withdraw' }"-->
            <!--                      exact-->
            <!--                      active-class="active"-->
            <!--                    >-->
            <!--                      <q-item v-close-popup>-->
            <!--                        <q-item-section avatar>-->
            <!--                          <q-avatar>-->
            <!--                            <img src="../assets/Man_2.png" alt="" />-->
            <!--                          </q-avatar>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section>-->
            <!--                          <q-item-label>Withdraw</q-item-label>-->
            <!--                        </q-item-section>-->
            <!--                        <q-item-section side> </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </router-link>-->
            <!--                  </q-list>-->
            <!--                </q-btn-dropdown>-->
            <!--              </q-list>-->

            <!--              <template v-slot:label>-->
            <!--                <img src="../assets/menu.svg" alt="" />-->
            <!--              </template>-->
            <!--            </q-btn-dropdown>-->
          </div>
        </div>
      </div>
    </header>
  </div>
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

<style scoped>
.header-bg {
  background: #027be3;
  position: relative;
  margin: 0 auto -20px;
  padding: 10px 0;
}

.logo {
  position: absolute;
  left: 16%;
  object-fit: contain;
  top: -4%;
  width: 16%;
  min-width: 200px;
}
.nav-bar {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  /*align-items: center;*/
}
.nav {
  display: flex;
  justify-content: flex-end;
  /*align-items: center;*/
  padding-top: 18px;
}
.nav-bar li {
  padding: 0 5px;
}

.nav-bar li img {
  height: 30px;
  object-fit: contain;
}
.nav-bar li a {
  padding: 0 5px;
  border-bottom: 2px solid transparent;
  color: #fff;
}
.nav li a.active,
.nav li a:hover {
  border-bottom: 2px solid blue;
}
.nav li.hide-sp {
  margin-top: 5px;
}

.ava {
  object-fit: contain;
  height: 30px !important;
}

@media (max-width: 1350px) {
  .logo {
    position: relative;
    top: 0;
    left: 0;
  }
  .nav {
    justify-content: space-between;
    padding: 15px;
  }
}
@media (max-width: 768px) {
  /*.q-btn-dropdown__arrow {*/
  /*  display: none;*/
  /*}*/
}
</style>
