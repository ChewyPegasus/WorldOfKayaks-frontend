import React, { useState, useEffect } from 'react';
import { cartService } from '../../services/cartService';
import CartItem from './CartItem';
import { Container, Typography, Button, Box } from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await cartService.updateQuantity(productId, quantity);
      loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await cartService.checkout();
      loadCart();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ))}
      <Box mt={3}>
        <Typography variant="h6">
          Total: ${cart.total}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          disabled={cart.items.length === 0}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;