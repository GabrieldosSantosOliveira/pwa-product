import axios from 'axios';

import { refreshToken } from './refreshToken';

const apiContext = (token?: string) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status === 401) {
        try {
          console.log('401');
          const { token } = await refreshToken();
          error.config.headers['Authorization'] =
            'Bearer ' + token;
          console.log('401', error.config);
          return axios.request(error.config);
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
};

export { apiContext };
