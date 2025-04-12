import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Analytics = () => {
  const [shipmentData, setShipmentData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const shipmentsRes = await axios.get('http://localhost:5000/api/analytics/shipments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShipmentData(shipmentsRes.data);

      const inventoryRes = await axios.get('http://localhost:5000/api/analytics/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventoryData(inventoryRes.data);
    };

    fetchAnalytics();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Analytics Dashboard</Typography>

      <Box component={Paper} sx={{ p: 3, my: 4 }}>
        <Typography variant="h6">Shipment Status</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={shipmentData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box component={Paper} sx={{ p: 3 }}>
        <Typography variant="h6">Total Inventory</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="quantity"
              data={inventoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label={({ item }) => item}
            >
              {inventoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default Analytics;
