import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minilink-mhvk.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;