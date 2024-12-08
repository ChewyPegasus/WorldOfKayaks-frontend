import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { routeService } from '../../services/routeService';

const RouteDetails = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await routeService.getRoute(id);
        setRoute(response.data);
      } catch (error) {
        console.error('Error fetching route:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!route) return <Typography>Route not found</Typography>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {route.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <img
            src={route.imageUrl || 'route-placeholder.jpg'}
            alt={route.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Route Details</Typography>
            <Box mb={2}>
              <Typography variant="body1">Difficulty: {route.difficulty}</Typography>
              <Typography variant="body1">Duration: {route.duration} hours</Typography>
              <Typography variant="body1">Distance: {route.distance} km</Typography>
              <Typography variant="body1">Elevation: {route.elevation} m</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Book This Route
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Description</Typography>
          <Typography variant="body1" paragraph>
            {route.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RouteDetails;