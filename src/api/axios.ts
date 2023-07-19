import axios from 'axios';

import { loadAuthToken } from '../utils/localStorage';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const token = loadAuthToken();
if (token) {
  instance.interceptors.request.use((request) => {
    request.headers.Authorization = token.access_token;
    return request;
  });
}

export default instance;
