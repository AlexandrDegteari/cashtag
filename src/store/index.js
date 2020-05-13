import Vue from "vue";
import Vuex from "vuex";
import user from "src/store/modules/user";
import auth from "src/store/modules/auth";

// import example from './modules'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const store = new Vuex.Store({
    modules: {
      user,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return store;
}
export const store = new Vuex.Store({
  modules: {
    user,
    auth
  }
});
