import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, Box } from '@mui/material';
import { userService } from '../../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await userService.getCurrentUser();
        setUser(userResponse.data);
        
        const bookingsResponse = await userService.getUserBookings();
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Personal Information</Typography>
            <Box mb={2}>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
            </Box>
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>My Bookings</Typography>
            {bookings.length === 0 ? (
              <Typography>No bookings found</Typography>
            ) : (
              bookings.map((booking) => (
                <Paper key={booking.id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">{booking.routeName}</Typography>
                  <Typography>Date: {new Date(booking.date).toLocaleDateString()}</Typography>
                  <Typography>Status: {booking.status}</Typography>
                </Paper>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;