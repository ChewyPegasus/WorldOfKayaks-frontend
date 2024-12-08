import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Box, MenuItem, Pagination } from '@mui/material';
import RouteCard from './RouteCard';
import { routeService } from '../../services/routeService';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: '',
    duration: '',
    searchQuery: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1
  });

  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
  const durations = ['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'];

  useEffect(() => {
    fetchRoutes();
  }, [filters, pagination.page]);

  const fetchRoutes = async () => {
    try {
      const response = await routeService.getRoutes({
        ...filters,
        page: pagination.page,
        limit: 9
      });
      setRoutes(response.data.routes);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(response.data.total / 9)
      }));
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hiking Routes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {difficulties.map(diff => (
                <MenuItem key={diff} value={diff.toLowerCase()}>
                  {diff}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Duration"
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {durations.map(dur => (
                <MenuItem key={dur} value={dur}>
                  {dur}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {routes.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No routes found</Typography>
          </Grid>
        ) : (
          routes.map(route => (
            <Grid item xs={12} sm={6} md={4} key={route.id}>
              <RouteCard route={route} />
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default RouteList;