import axios from "axios";
import jwt_decode from "jwt-decode";

const api = "https://protected-garden-19195.herokuapp.com";
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

const UpdateAvatar = avatar => {
  return axios
    .put(`${api}/users/avatar`, avatar)
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

const UpdatePassword = password => {
  return axios.put(`${api}/users/current/password`, password);
};

export default {
  GetUserInfo,
  UpdateAvatar,
  UpdateProfile,
  UpdatePassword
};
