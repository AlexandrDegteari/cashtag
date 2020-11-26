import Vue from "vue";
import axios from "axios";

const api = "https://api.mycashtag.de";
//const api = "https://protected-garden-19195.herokuapp.com";
// const api = "http://localhost:4000";
// const api = "https://api.cashtag.appflex.dev";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);

const state = {
  status: "",
  profile: {}
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.id
};

const actions = {
  userRequest: ({ commit, dispatch }) => {
    commit("userRequest");
    axios
      .get(`${api}/users/current`)
      .then(response => {
        commit("userSuccess", response.data);
      })
      .catch(err => {
        if (
          err.response &&
          err.response.status &&
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          commit("userError");
          // if resp is unauthorized, logout, to
          dispatch("authLogout");
        }
        throw err;
      });
  },
  // eslint-disable-next-line no-unused-vars
  setAxiosLocale: ({ dispatch }, locale) => {
    axios.interceptors.request.use(
      function(config) {
        config.headers["X-Locale"] = locale;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }
};

const mutations = {
  userRequest: state => {
    state.status = "loading";
  },
  userSuccess: (state, response) => {
    state.status = "success";
    Vue.set(state, "profile", response);
  },
  userError: state => {
    state.status = "error";
  },
  userRemove: state => {
    Vue.set(state, "profile", null);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
