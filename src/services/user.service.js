import axios from "axios";
import jwt_decode from "jwt-decode";

const api = "https://protected-garden-19195.herokuapp.com";
// const api = "http://localhost:4000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);

const GetUserInfo = () => {
  return axios
    .get(`${api}/users/current`)
    .then(response => {
      if (response.data) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};

const GetUsers = () => {
  return axios
    .get(`${api}/users/`)
    .then(response => {
      if (response.data) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};

const UpdateProfile = profile => {
  const userId = jwt_decode(localStorage.getItem("access_token")).sub;
  return axios
    .put(`${api}/users/` + userId, profile)
    .then(response => {
      if (response.data) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};
const UpdateUserProf = (profile, userId) => {
  // const userId = jwt_decode(localStorage.getItem("access_token")).sub;
  return axios
    .put(`${api}/users/` + userId, profile)
    .then(response => {
      if (response.data) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};

const UpdatePassword = password => {
  const userId = jwt_decode(localStorage.getItem("access_token")).sub;
  return axios.put(`${api}/users/` + userId, password);
};

const UpdateUserPass = (password, userId) => {
  // const userId = jwt_decode(localStorage.getItem("access_token")).sub;
  return axios.put(`${api}/users/` + userId, password);
};

const DeleteUser = userId => {
  return axios.delete(`${api}/users/` + userId);
};

export default {
  GetUserInfo,
  GetUsers,
  UpdateProfile,
  UpdatePassword,
  UpdateUserProf,
  UpdateUserPass,
  DeleteUser
};
