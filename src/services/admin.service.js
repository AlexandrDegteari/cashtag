import axios from "axios";
import jwt_decode from "jwt-decode";

const api = "https://protected-garden-19195.herokuapp.com";
// const api = "http://localhost:4000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);

const GetUserInfo = () => {
  return axios
    .get(`${api}/admin/current`)
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
    .get(`${api}/admin/`)
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
    .put(`${api}/admin/` + userId, profile)
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
    .put(`${api}/admin/` + userId, profile)
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
  return axios.put(`${api}/admin/current/`, password);
};

export default {
  GetUserInfo,
  GetUsers,
  UpdateProfile,
  UpdatePassword,
  UpdateUserProf
};
