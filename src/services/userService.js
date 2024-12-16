import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
  // Аутентификация
  login: async (credentials) => {
    try {
      console.log('Login attempt:', credentials);
      const response = await api.post('/auth/authenticate', {
        login: credentials.login, 
        password: credentials.password
      });
      console.log('Login response:', response);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Register attempt:', userData);
      const response = await api.post('/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password
      });
      console.log('Register response:', response);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Register error:', error.response ? error.response.data : error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Профиль пользователя
  getCurrentUser: async () => {
    return await api.get('/users/profile', {
      headers: getAuthHeader()
    });
  },

  updateProfile: async (userData) => {
    return await api.put('/users/profile', userData, {
      headers: getAuthHeader()
    });
  },

  // Бронирования пользователя
  getUserBookings: async () => {
    return await api.get('/users/bookings', {
      headers: getAuthHeader()
    });
  },

  createBooking: async (bookingData) => {
    return await api.post('/bookings', bookingData, {
      headers: getAuthHeader()
    });
  },

  cancelBooking: async (bookingId) => {
    return await api.delete(`/bookings/${bookingId}`, {
      headers: getAuthHeader()
    });
  },

  // Избранное
  getFavorites: async () => {
    return await api.get('/users/favorites', {
      headers: getAuthHeader()
    });
  },

  addToFavorites: async (routeId) => {
    return await api.post(`/users/favorites/${routeId}`, {}, {
      headers: getAuthHeader()
    });
  },

  removeFromFavorites: async (routeId) => {
    return await api.delete(`/users/favorites/${routeId}`, {
      headers: getAuthHeader()
    });
  },

  // Изменение пароля
  changePassword: async (passwordData) => {
    return await api.post('/users/change-password', passwordData, {
      headers: getAuthHeader()
    });
  },

  // Восстановление пароля
  requestPasswordReset: async (email) => {
    return await api.post('/auth/reset-password-request', { email });
  },

  resetPassword: async (token, newPassword) => {
    return await api.post('/auth/reset-password', {
      token,
      newPassword
    });
  },

  // Проверка аутентификации
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify', {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  }
};