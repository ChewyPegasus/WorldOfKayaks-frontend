import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../services/api';
import { formatDuration, formatPoints } from '../../utils/formatters';

const RouteCard = ({ route }) => {
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${API_BASE_URL}/img/default/route.jpg`;
    // Убедимся, что путь начинается со слеша
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${API_BASE_URL}${path}`;
  };

  return (
    <Card component={Link} to={`/routes/${route.id}`} sx={{ textDecoration: 'none' }}>
      <CardMedia
        component="img"
        height="200"
        image={getImageUrl(route.imageUrl)}
        alt={route.riverName}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {route.riverName}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {route.description}
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
          <Chip label={`Difficulty: ${route.difficulty}`} color="primary" />
          <Chip label={`Duration: ${formatDuration(route.duration)}`} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Route: {formatPoints(route.points)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RouteCard;