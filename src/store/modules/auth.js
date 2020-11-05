import Errors from "./../../modules/errors";
import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = "https://api.mycashtag.de";
// const apiUrl = "http://localhost:4000";
//const apiUrl = "https://protected-garden-19195.herokuapp.com";

const state = {
  access_token: localStorage.getItem("access_token") || "",
  status: "",
  hasLoadedOnce: false,
  errors: new Errors()
};

const getters = {
  isAuthenticated: state => !!state.access_token,
  authStatus: state => state.status,
  authErrors: state => state.errors
};

const actions = {
  authRequest: ({ commit, dispatch }, payload) => {
    let actionUrl = apiUrl + "/users/authenticate";
    let remember = payload.remember ? payload.remember : false;
    let data = {
      email: payload.email,
      password: payload.password
    };

    if (payload.action === "password-reset") {
      actionUrl = apiUrl + "/users/" + jwt_decode(payload.token).sub;
      data = {
        token: payload.token,
        username: payload.username,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      };
    }

    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios
        .post(actionUrl, data)
        .then(resp => {
          let access_token = "Bearer " + resp.data.token;
          localStorage.setItem("access_token", access_token, {
            expires: remember ? 365 : 1
          });
          axios.defaults.headers.common["Authorization"] = access_token;
          localStorage.user = JSON.stringify(resp.data);

          commit("authSuccess", access_token);

          dispatch("userRequest");
          resolve(access_token);
        })
        .catch(err => {
          commit("authError", err.response.data);
          localStorage.removeItem("access_token");
          reject(err);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  authLogout: ({ commit, dispatch }) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    commit("authLogout");
    commit("userRemove");
  },
  // eslint-disable-next-line no-unused-vars
  authRegister: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "/users/register", payload)
        .then(response => {
          if (response.data) {
            resolve();
            return response.data;
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  authRequest: state => {
    state.status = "loading";
  },
  authSuccess: (state, access_token) => {
    state.status = "success";
    state.access_token = access_token;
    state.hasLoadedOnce = true;
  },
  authError: (state, err) => {
    let errors = err.errors ? err.errors : {};
    if (err.error === "invalid_credentials") {
      errors.invalid_credentials = ["The user credentials were incorrect."];
    }

    state.status = "error";
    state.hasLoadedOnce = true;
    state.errors.record(errors);
  },
  authLogout: state => {
    state.access_token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
