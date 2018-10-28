import axios from 'axios';

export function configureAxios(userToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
}

export const Request = {
  get: (url, params) => {
    return axios.get(url, {
      params: params
    })
      .then(response => response.data)
  },
  post: (url, data, config) => {
    return axios.post(url, data, config)
      .then(response => response.data)
  },
  patch: (url, data, config) => {
    return axios.patch(url, data, config)
      .then(response => response.data)
  }
};


