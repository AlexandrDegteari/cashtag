import axios from "axios";

const api = "https://protected-garden-19195.herokuapp.com";

const CheckUsername = username => {
  return axios
    .get(`${api}/user/register/check-username/${username}`)
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

const CheckEmail = email => {
  return axios
    .post(`${api}/user/register/check-email`, email)
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

export default {
  CheckUsername,
  CheckEmail
};
