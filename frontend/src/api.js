import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // ชี้ไปยัง Backend พอร์ต 5000
  withCredentials: true, // เปิดใช้งาน Cookies สำหรับคำขอ
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export default API;
