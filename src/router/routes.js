import { store } from "../store/";
const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

// eslint-disable-next-line no-unused-vars
const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  localStorage.setItem("intended", to.path);
  next("/");
};

const routes = [
  {
    path: "/",
    component: () => import("pages/Layout.vue"),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("pages/User/User.vue"),
        children: [
          {
            name: "user-profile",
            path: "/",
            component: () => import("pages/Profile")
            // beforeEnter: ifAuthenticated
          },
          {
            name: "user-transactions",
            path: "/user-transactions",
            component: () => import("pages/User/Transactions"),
            beforeEnter: ifNotAuthenticated
          },
          {
            name: "user-auctions",
            path: "/user-auctions",
            component: () => import("pages/User/Auctions")
          },
          {
            name: "user-auction",
            path: "/user-auction",
            component: () => import("pages/User/Auction")
          },
          {
            name: "user-wallet",
            path: "/user-wallet",
            component: () => import("pages/User/Wallet")
          },
          {
            name: "user-withdraw",
            path: "/user-withdraw",
            component: () => import("pages/User/Withdraw")
          }
        ]
      },
      {
        path: "payment",
        name: "payment",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Payment.vue")
      },
      {
        path: "payment2",
        name: "payment2",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Payment2.vue")
      },
      {
        path: "buy-credit",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/BuyCredit.vue")
      },
      {
        path: "buy-credit2",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/BuyCredit2.vue")
      },
      {
        name: "auction",
        path: "auction",
        component: () => import("pages/Profile.vue")
      },
      {
        name: "auctions",
        path: "auctions",
        component: () => import("pages/User/Auction.vue")
      },
      {
        name: "login",
        path: "login",
        component: () => import("pages/Login.vue")
      },
      {
        name: "register",
        path: "register",
        component: () => import("pages/Register.vue")
      },
      {
        name: "search",
        path: "search",
        component: () => import("pages/Search.vue")
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("pages/Contact.vue")
      },
      { path: "*", component: () => import("pages/NotFound.vue") }
    ]
  }
];

// Always leave this as last one
// if (process.env.MODE !== "ssr") {
//   routes.push({
//     path: "*",
//     component: () => import("pages/NotFound.vue")
//   });
// }

export default routes;
