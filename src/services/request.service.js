import axios from "axios";

const api = "https://api.kairos888.com/v1";

const GetSponsorUsername = code => {
  return axios.get(`${api}/user/register/referer-code/${code}`);
};

const CheckSponsor = username => {
  return axios
    .get(`${api}/user/register/check-sponsor/${username}`)
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

const GetCountries = () => {
  return axios
    .get(`${api}/countries`)
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
  GetSponsorUsername,
  CheckSponsor,
  CheckUsername,
  CheckEmail,
  GetCountries
};
