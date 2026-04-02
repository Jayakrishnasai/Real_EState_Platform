import axios from 'axios';

const isServer = typeof window === 'undefined';

const api = axios.create({
  // SSR requires absolute URLs within the Docker network, while browsers can leverage the Nginx reverse proxy flawlessly via `/api`.
  baseURL: isServer ? (process.env.NEXT_PUBLIC_API_URL_SERVER || 'http://backend:5000/api') : '/api',
});

// Add a request interceptor to append the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
