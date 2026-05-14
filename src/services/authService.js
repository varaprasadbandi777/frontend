import api from './api';

const login = async (email, password) => {
  const response = await api.post('auth/login', { email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = async (name, email, password, role, adminSecret) => {
  const response = await api.post('auth/register', { name, email, password, role, adminSecret });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
