import axios from "axios";

const api = "http://localhost:4000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);

const GetUserInfo = () => {
  return axios
    .get(`${api}user/info`)
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
    .patch(`${api}user/avatar`, avatar)
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
  return axios.patch(`${api}user/password`, password);
};

export default {
  GetUserInfo,
  UpdateAvatar,
  UpdateProfile,
  UpdateAddress,
  UpdatePassword
};
