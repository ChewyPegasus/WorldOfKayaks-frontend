import api from './api';

export const routeService = {
  getAllRoutes: () => api.get('/routes'),
  getRoute: (id) => api.get(`/routes/${id}`),
  createRoute: (data) => api.post('/routes', data),
  updateRoute: (id, data) => api.put(`/routes/${id}`, data),
  deleteRoute: (id) => api.delete(`/routes/${id}`)
};