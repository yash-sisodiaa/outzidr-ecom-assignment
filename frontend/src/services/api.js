import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// ← Add this interceptor to automatically add tenant header to ALL requests
api.interceptors.request.use((config) => {
  // You can make this dynamic later (from user context, localStorage, input field, etc.)
  const tenantId = localStorage.getItem('tenantId') || 'test-tenant-123'; // default fallback

  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId;
  }

  // Optional: add Authorization if you store access token
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Sending request with tenant:', tenantId);
  return config;
}, (error) => Promise.reject(error));

// Your existing response interceptor for 401 → refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        console.log('Refresh failed, redirecting to login');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;