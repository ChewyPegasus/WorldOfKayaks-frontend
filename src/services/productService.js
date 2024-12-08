import api from './api';

export const productService = {
  getAllProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (product, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('product', JSON.stringify(product));

    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  // updateProduct: (id, data) => api.put(`/products/${id}`, data),
  // deleteProduct: (id) => api.delete(`/products/${id}`)
};