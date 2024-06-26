import axios from 'axios';

// Services
import { getToken } from './services/tokenService';

const modeUrl = 'http://localhost:5000';

export const API_URL = modeUrl;
export const URL = 'http://localhost:3000';

// Instance of axios
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    const token =  await getToken();
    if (token) {
      if (config?.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  },
);

API.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default API;
