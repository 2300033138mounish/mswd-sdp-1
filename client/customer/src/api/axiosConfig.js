import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Authorization token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
