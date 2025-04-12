import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [shipmentStats, setShipmentStats] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const shipmentRes = await axios.get("http://localhost:5000/api/analytics/shipments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inventoryRes = await axios.get("http://localhost:5000/api/analytics/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Safe checks to ensure data is in array format
        setShipmentStats(Array.isArray(shipmentRes.data) ? shipmentRes.data : []);
        setInventory(Array.isArray(inventoryRes.data) ? inventoryRes.data : []);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setShipmentStats([]);
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Logistics Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3}>
            {shipmentStats.map((stat) => (
              <Grid item xs={12} sm={4} key={stat.status}>
                <Card sx={{ backgroundColor: "#e3f2fd" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {stat.status}
                    </Typography>
                    <Typography variant="h4">{stat.count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Shipment Chart */}
          <Box mt={5}>
            <Typography variant="h6" gutterBottom>
              Shipment Status Overview
            </Typography>
            <Card>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={shipmentStats}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Inventory List */}
          <Box mt={5}>
            <Typography variant="h6" gutterBottom>
              Inventory Summary
            </Typography>
            <Card>
              <CardContent>
                <List>
                  {inventory.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={item.item}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
