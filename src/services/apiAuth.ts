import axios from 'axios';

const apiContext = (token?: string) => {
  return axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { apiContext };
