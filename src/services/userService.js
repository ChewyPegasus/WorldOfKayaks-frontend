import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
  // Аутентификация
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  register: async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  // Профиль пользователя
  getCurrentUser: async () => {
    return await axios.get(`${API_URL}/users/profile`, {
      headers: getAuthHeader()
    });
  },

  updateProfile: async (userData) => {
    return await axios.put(`${API_URL}/users/profile`, userData, {
      headers: getAuthHeader()
    });
  },

  // Бронирования пользователя
  getUserBookings: async () => {
    return await axios.get(`${API_URL}/users/bookings`, {
      headers: getAuthHeader()
    });
  },

  createBooking: async (bookingData) => {
    return await axios.post(`${API_URL}/bookings`, bookingData, {
      headers: getAuthHeader()
    });
  },

  cancelBooking: async (bookingId) => {
    return await axios.delete(`${API_URL}/bookings/${bookingId}`, {
      headers: getAuthHeader()
    });
  },

  // Избранное
  getFavorites: async () => {
    return await axios.get(`${API_URL}/users/favorites`, {
      headers: getAuthHeader()
    });
  },

  addToFavorites: async (routeId) => {
    return await axios.post(`${API_URL}/users/favorites`, { routeId }, {
      headers: getAuthHeader()
    });
  },

  removeFromFavorites: async (routeId) => {
    return await axios.delete(`${API_URL}/users/favorites/${routeId}`, {
      headers: getAuthHeader()
    });
  },

  // Изменение пароля
  changePassword: async (passwordData) => {
    return await axios.put(`${API_URL}/users/password`, passwordData, {
      headers: getAuthHeader()
    });
  },

  // Восстановление пароля
  requestPasswordReset: async (email) => {
    return await axios.post(`${API_URL}/auth/forgot-password`, { email });
  },

  resetPassword: async (token, newPassword) => {
    return await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      newPassword
    });
  },

  // Проверка аутентификации
  verifyToken: async () => {
    try {
      await axios.get(`${API_URL}/auth/verify`, {
        headers: getAuthHeader()
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};