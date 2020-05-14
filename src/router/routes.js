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
        name: "home",
        path: "/",
        component: () => import("pages/User/User.vue"),
        children: [
          {
            name: "user-profile",
            path: "/",
            component: () => import("pages/Profile")
            // beforeEnter: ifAuthenticated
          }
        ]
      },
      {
        name: "auction",
        path: "auction",
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
        component: () => import("pages/Register.vue")
      },
      {
        name: "search",
        path: "search",
        component: () => import("pages/Search.vue")
      },
      {
        name: "restaurants",
        path: "restaurants",
        component: () => import("pages/Restaurants.vue")
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
