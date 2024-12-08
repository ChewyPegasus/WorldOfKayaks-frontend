import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../services/api';

const RouteCard = ({ route }) => {
  return (
    <Card component={Link} to={`/routes/${route.id}`} sx={{ textDecoration: 'none' }}>
      <CardMedia
        component="img"
        height="200"
        image={route.imageUrl ? `${API_BASE_URL}${route.imageUrl}` : 'route.jpg'}
        alt={route.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {route.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {route.description}
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip label={`Difficulty: ${route.difficulty}`} color="primary" />
          <Chip label={`Duration: ${route.duration} hours`} />
          <Chip label={`Distance: ${route.distance} km`} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard;