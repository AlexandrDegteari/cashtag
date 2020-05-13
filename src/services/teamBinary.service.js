import axios from "axios";

const api = "https://api.kairos888.com/v1/";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);
const GetTeamInfo = parent => {
  return axios
    .get(`${api}user/team${parent}`)
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
const SearchTeam = searchKeyWord => {
  return axios
    .get(`${api}user/team/search?query=${searchKeyWord}`)
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
const SendDefaultPlacement = defaultPlacementObj => {
  return axios
    .post(`${api}user/profile`, defaultPlacementObj)
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
const GetBinaryTransactions = (page, perPage) => {
  return axios
    .get(
      `${api}user/finance/binary-transactions?page=${page}&per-page=${perPage}`
    )
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
  GetTeamInfo,
  SearchTeam,
  SendDefaultPlacement,
  GetBinaryTransactions
};
