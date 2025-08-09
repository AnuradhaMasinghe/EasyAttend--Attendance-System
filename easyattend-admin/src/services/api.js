import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUsers = () => API.get('/users');
export const addUser = (user) => API.post('/users', user);
export const markAttendance = (data) => API.post('/attendance', data);
export const getAttendance = () => API.get('/attendance');
export const editUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);


export default {
  getUsers,
  addUser,
  markAttendance,
  getAttendance,
  deleteUser,
  editUser
};
