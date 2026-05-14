import api from './api';

const getPendingUsers = async () => {
  const response = await api.get('users/pending');
  return response.data;
};

const approveUser = async (id) => {
  const response = await api.put(`users/${id}/approve`);
  return response.data;
};

const rejectUser = async (id) => {
  const response = await api.delete(`users/${id}`);
  return response.data;
};

const userService = {
  getPendingUsers,
  approveUser,
  rejectUser,
};

export default userService;
