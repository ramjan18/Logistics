import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InsightsIcon from '@mui/icons-material/Insights';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Track Shipments',
    description: 'Real-time tracking of all your logistics shipments.',
  },
  {
    icon: <WarehouseIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Warehouse Inventory',
    description: 'Manage and monitor warehouse inventory effectively.',
  },
  {
    icon: <InsightsIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Analytics Dashboard',
    description: 'Gain insights with smart logistics analytics tools.',
  },
];

const Home = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Logistics Management System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Manage your shipments, warehouses, and drivers from one central dashboard.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/dashboard">
          Go to Dashboard
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              {feature.icon}
              <CardContent>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
