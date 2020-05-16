import axios from "axios";

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
    .patch(`${api}/users/current/avatar`, avatar)
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
  return axios
    .patch(`${api}user/profile`, profile)
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
const UpdateAddress = address => {
  return axios.patch(`${api}user/address`, address);
};
const UpdatePassword = password => {
  return axios.put(`${api}/users/current/password`, password);
};

export default {
  GetUserInfo,
  UpdateAvatar,
  UpdateProfile,
  UpdateAddress,
  UpdatePassword
};
