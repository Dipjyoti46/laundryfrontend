// Corrected axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://laundrybackend-2.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Set the Authorization header if we have a token
const token = localStorage.getItem('access_token');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Use `interceptors.response.use`, not `request.use`
axiosInstance.interceptors.response.use(
    // On success, just return the response
    response => response,

    // On error, handle it
    async error => {
        const originalRequest = error.config;

        // Check if it's a 401 error, not from a token refresh attempt, and not already retried
        if (error.response.status === 401 && originalRequest.url !== '/api/token/refresh/' && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    // Handle case where there is no refresh token
                    console.error("No refresh token available.");
                    // Optionally, redirect to login page here
                    // window.location.href = '/login';
                    return Promise.reject(error);
                }

                const response = await axiosInstance.post('/api/token/refresh/', {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);
                
                // Update the default header for all subsequent requests
                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access;
                // Update the header for the original failed request
                originalRequest.headers['Authorization'] = 'Bearer ' + access;
                
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error('Error refreshing token:', err);
                // Handle refresh token failure (e.g., it expired)
                // Clear storage and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                // window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;