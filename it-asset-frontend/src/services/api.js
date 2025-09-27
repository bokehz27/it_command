// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // URL ของ Backend ของเรา
});

// Interceptor: ดักจับทุก request ที่จะส่งออกไป
api.interceptors.request.use(
  (config) => {
    // ดึง token จาก localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // ถ้ามี token ให้แนบไปกับ Header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;