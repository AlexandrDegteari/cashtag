import axios from "axios";

const api = "https://api.kairos888.com/v1";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);
const GetOverview = () => {
  return axios
    .get(`${api}/user/social-circle/overview`)
    .then(response => {
      if (response) {
        return response;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};
const GetChartOverview = (period, level) => {
  return axios
    .get(`${api}/user/social-circle/overview-chart/${period}/${level}`)
    .then(response => {
      if (response) {
        return response;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};

export default {
  GetOverview,
  GetChartOverview
};
