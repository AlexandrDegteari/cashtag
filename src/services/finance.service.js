import axios from "axios";

const api = "https://api.kairos888.com/v1";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token"
);
const GetBalance = () => {
  return axios
    .get(`${api}/user/finance/balance`)
    .then(response => {
      if (response) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};
const GetTransactions = (
  currency_code,
  page,
  perPage,
  sort,
  sortOrder,
  search
) => {
  return axios
    .get(`${api}/user/finance/transactions/${currency_code}`, {
      params: {
        page: page,
        perPage: perPage,
        sort: sort,
        sortOrder: sortOrder,
        search: search
      }
    })
    .then(response => {
      if (response) {
        return response.data;
      }
      return false;
    })
    .catch(error => {
      return { error };
    });
};

const SearchTransactions = (currency_code, searchKeyWord) => {
  return axios
    .get(`${api}/user/finance/transactions/${currency_code}`, {
      params: {
        search: searchKeyWord
      }
    })
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
  GetBalance,
  GetTransactions,
  SearchTransactions
};
