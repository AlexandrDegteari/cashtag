import Errors from "./../../modules/errors";
import axios from "axios";

const apiUrl = "http://localhost:4000";

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
    // let actionUrl = apiUrl + "v1/user/login";
    let actionUrl = apiUrl + "/users/authenticate";
    let remember = payload.remember ? payload.remember : false;
    let data = {
      username: payload.username,
      password: payload.password
    };

    // if (payload.action == 'password-reset') {
    //     actionUrl = '/api/v1/password/reset';
    //     data = {
    //         'token': payload.token,
    //         'username': payload.username,
    //         'password': payload.password,
    //         'password_confirmation': payload.password_confirmation
    //     }
    // }

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
          localStorage.user = JSON.stringify(resp.data.user);

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
  },
  // eslint-disable-next-line no-unused-vars
  postAmount: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl + "/users/wallet", payload)
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
