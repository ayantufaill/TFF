import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://tff-production-3e66.up.railway.app/api' : 'http://localhost:5000/api');

baseURL = baseURL.trim();

// Ensure the protocol is included
if (!baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
  baseURL = 'https://' + baseURL;
}

// Ensure the /api suffix is appended
if (!baseURL.endsWith('/api') && !baseURL.endsWith('/api/')) {
  baseURL = baseURL.endsWith('/') ? baseURL + 'api' : baseURL + '/api';
}

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
