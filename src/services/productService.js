import api from './api';

export const productService = {
  getAllProducts: async () => {
    try {
      console.log('Fetching all products');
      const response = await api.get('/products');
      console.log('Products response:', response);
      
      // Ensure we always return an array, even if response is undefined
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return empty array on error
    }
  },

  getProductById: async (id) => {
    try {
      console.log(`Fetching product with id: ${id}`);
      const response = await api.get(`/products/${id}`);
      console.log('Product response:', response);
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  },

  createProduct: async (productData, file) => {
    try {
      const formData = new FormData();
      formData.append('product', JSON.stringify(productData));
      formData.append('file', file);

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product created:', response);
      return response?.data || null;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
};