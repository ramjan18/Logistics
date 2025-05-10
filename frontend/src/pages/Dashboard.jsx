import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../utils/axios";

// Custom colors for each status
const COLORS = ["#FF9800", "#2196F3", "#FFC107", "#4CAF50", "#F44336"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    dispatched: 0,
    inTransit: 0,
    delivered: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/getAllBookShipments");
      const bookings = res.data.data;
      const statusCounts = {
        pending: 0,
        dispatched: 0,
        inTransit: 0,
        delivered: 0,
        cancelled: 0,
      };

      bookings.forEach((b) => {
        const status = b.status?.toLowerCase();
        switch (status) {
          case "pending":
            statusCounts.pending++;
            break;
          case "dispatched":
            statusCounts.dispatched++;
            break;
          case "in-transit":
          case "intransit":
            statusCounts.inTransit++;
            break;
          case "delivered":
            statusCounts.delivered++;
            break;
          case "cancelled":
          case "canceled":
            statusCounts.cancelled++;
            break;
          default:
            break;
        }
      });

      setStats(statusCounts);
    } catch (err) {
      console.error("Error fetching booking stats:", err);
    }
  };

  const orderData = [
    { label: "Pending", value: stats.pending },
    { label: "Dispatched", value: stats.dispatched },
    { label: "In Transit", value: stats.inTransit },
    { label: "Delivered", value: stats.delivered },
    { label: "Cancelled", value: stats.cancelled },
  ].filter((item) => item.value > 0);

  const statusCards = [
    { label: "Pending", value: stats.pending, color: "#FF9800" },
    { label: "Dispatched", value: stats.dispatched, color: "#2196F3" },
    { label: "In Transit", value: stats.inTransit, color: "#FFC107" },
    { label: "Delivered", value: stats.delivered, color: "#4CAF50" },
    { label: "Cancelled", value: stats.cancelled, color: "#F44336" },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f2f1, #f1f8e9)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{ color: "#333" }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={2} mb={4} justifyContent="center">
        {statusCards.map((item, idx) => (
          <Grid item key={idx}>
            <Card
              sx={{
                minWidth: 160,
                borderLeft: `6px solid ${item.color}`,
                backgroundColor: "#ffffff",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  sx={{ color: item.color, fontWeight: "bold" }}
                >
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={6}
        sx={{
          maxWidth: 700,
          margin: "auto",
          padding: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Shipment Request Status
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {orderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>

          <Typography variant="caption" color="textSecondary">
            Order Status Breakdown
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
