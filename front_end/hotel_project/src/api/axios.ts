import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${(import.meta as any).env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user data from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (user) {
    // Add user info in headers or params, based on your requirements
    config.headers['X-User-Id'] = user.id;
    config.headers['X-User-Name'] = user.name;
  }
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove user data if the session is invalid
      }
    } else {
      console.error('Network or server error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
