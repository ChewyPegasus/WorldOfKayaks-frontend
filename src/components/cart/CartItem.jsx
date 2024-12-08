import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { cartService } from '../../services/cartService';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity < 1) return;

    try {
      await cartService.updateCartItem(item.id, newQuantity);
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await cartService.removeFromCart(item.id);
      onRemove(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <CardMedia
            component="img"
            height="80"
            image={item.imageUrl || 'placeholder.jpg'}
            alt={item.name}
          />
        </Grid>
        <Grid item xs={4} sm={5}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            size="small"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">
              ${(item.price * quantity).toFixed(2)}
            </Typography>
            <IconButton onClick={handleRemove} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;