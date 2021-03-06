import { store } from "../store/";
// eslint-disable-next-line no-unused-vars
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
        name: "",
        path: "/",
        component: () => import("pages/Home.vue")
      },
      {
        name: "profile",
        path: "profile",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Profile.vue")
      },
      {
        name: "login",
        path: "login",
        component: () => import("pages/Login.vue")
      },
      {
        name: "register",
        path: "register",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Register.vue")
      },
      {
        name: "contact",
        path: "contact",
        component: () => import("pages/SendEmail.vue")
      },
      {
        name: "guest-table",
        path: "guest-table/:userId",
        params: {},
        props: true,
        component: () => import("pages/GuestTable.vue")
      },
      {
        name: "review",
        path: "review/:googleId/:userId",
        params: {},
        props: true,
        component: () => import("pages/Review.vue")
      },
      {
        name: "forgot",
        path: "forgot",
        params: {},
        props: true,
        component: () => import("pages/Forgot.vue")
      },
      {
        name: "statistics",
        path: "statistics",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Statistics.vue")
      },
      {
        name: "voucher",
        path: "voucher/:userId",
        component: () => import("pages/Voucher.vue")
      },
      {
        name: "optout",
        path: "optout/:userId",
        component: () => import("pages/OptOut.vue")
      },
      {
        name: "reststatistics",
        path: "reststatistics",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/RestStatistics.vue")
      },
      {
        name: "restaurants",
        path: "restaurants",
        beforeEnter: ifNotAuthenticated,
        component: () => import("pages/Restaurants2.vue")
      },
      { path: "*", component: () => import("pages/Error404.vue") }
    ]
  }
];

// Always leave this as last one
// if (process.env.MODE !== "ssr") {
//   routes.push({
//     path: "*",
//     component: () => import("pages/Error404.vue")
//   });
// }

export default routes;
