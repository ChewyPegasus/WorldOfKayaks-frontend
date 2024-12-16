import api from './api';

export const routeService = {
  getAllRoutes: async (difficulty = null, maxDuration = null) => {
    try {
      console.log('Fetching routes', { difficulty, maxDuration });
      const params = new URLSearchParams();
      if (difficulty !== null) params.append('difficulty', difficulty);
      if (maxDuration !== null) params.append('maxDuration', maxDuration);
      
      const response = await api.get(`/routes?${params.toString()}`);
      console.log('Routes response:', response);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  },

  getRouteById: async (id) => {
    try {
      console.log(`Fetching route with id: ${id}`);
      const response = await api.get(`/routes/${id}`);
      console.log('Route response:', response);
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching route with id ${id}:`, error);
      return null;
    }
  },

  createRoute: async (routeData) => {
    try {
      console.log('Creating route:', routeData);
      const response = await api.post('/routes', routeData);
      console.log('Route created:', response);
      return response?.data || null;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  },

  uploadRouteImage: async (routeId, file) => {
    try {
      console.log(`Uploading image for route ${routeId}`);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/routes/${routeId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Route image upload response:', response);
      return response?.data || null;
    } catch (error) {
      console.error(`Error uploading route image for route ${routeId}:`, error);
      throw error;
    }
  }
};