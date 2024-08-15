import axios from 'axios';
import { AuthResponse } from '../components/Authorization/models/AuthResponse';

export const API_URL = `https://localhost:7288/api`;

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

$api.interceptors.request.use((config) => {  // Intervepter )
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {  //if status code 401 refresh token
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/identity/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.token);
            return $api.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})

export default $api;