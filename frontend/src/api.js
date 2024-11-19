import axios from 'axios';

// Create an instance of Axios
const API = axios.create({
  baseURL: '/api', // Proxy path (ใช้ proxy เพื่อเชื่อม backend)
});

// Authentication APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Feedback APIs
// export const getFeedbacks = () => API.get('/feedback');
// export const createFeedback = (data) => API.post('/feedback', data);

// Comment APIs
export const getComments = () => API.get('/comment');
export const createComment = (data) => API.post('/comment', data);

// Post APIs
export const getPosts = () => API.get('/posts');
export const createPost = (data) => API.post('/posts', data);

// Like APIs
export const likePost = (postId) => API.post(`/likes`, { postId });

// Notification APIs
export const getNotifications = () => API.get('/notifications');

// Search APIs
export const searchPosts = (query) => API.get(`/search?query=${query}`);

// User APIs
export const getUserProfile = (userId) => API.get(`/users/${userId}`);

export default API;
