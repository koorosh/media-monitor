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
  post: (url, body, params) => {
    return axios.post(url, body, {
      params: params
    })
  }
};


