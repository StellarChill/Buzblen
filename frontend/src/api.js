import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // URL ของ Backend
    withCredentials: true,
});

// Authentication APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');

export default API;
