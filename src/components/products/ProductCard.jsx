import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { cartService } from '../../services/cartService';
import { API_BASE_URL } from '../../services/api';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const placeholderImage = `${API_BASE_URL}/img/default/product.jpg`;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product.id, 1);
      // Можно добавить уведомление об успешном добавлении
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={imageError ? placeholderImage : `${API_BASE_URL}${product.imageURL}`}
        onError={handleImageError}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            ${product.price}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;