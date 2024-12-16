import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, Box } from '@mui/material';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography>No user data available</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Personal Information</Typography>
          <Typography><strong>Username:</strong> {user.username}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/profile/edit')}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;