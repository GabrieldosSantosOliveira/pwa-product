import axios from 'axios';

const apiContext = (token?: string) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { apiContext };
