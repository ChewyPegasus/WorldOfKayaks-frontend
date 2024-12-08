import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart/add', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  updateQuantity: (productId, quantity) => api.put('/cart/update', { productId, quantity }),
  checkout: () => api.post('/cart/checkout')
};