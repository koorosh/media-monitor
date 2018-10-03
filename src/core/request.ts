import axios from 'axios';

export function configureAxios(userToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
}

export const Request = {
  get: (url, params) => {
    return axios.get(url, {
      params: params
    })
  },
  post: (url, data, config) => {
    return axios.post(url, data, config)
  },
  patch: (url, data, config) => {
    return axios.patch(url, data, config)
  }
};


