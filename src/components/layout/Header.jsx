import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const cartItemsCount = JSON.parse(localStorage.getItem('cartItems'))?.length || 0;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          SHPLAU
        </Typography>
        <Button color="inherit" component={Link} to="/routes">Routes</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Badge badgeContent={cartItemsCount} color="secondary" sx={{ mx: 2 }}>
          <ShoppingCartIcon component={Link} to="/cart" />
        </Badge>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;