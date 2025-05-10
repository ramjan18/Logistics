import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import InsightsIcon from "@mui/icons-material/Insights";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { PieChart } from "@mui/x-charts/PieChart";

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 60, color: "#1565c0" }} />,
    title: "Track Shipments",
    description: "Real-time tracking of all your logistics shipments.",
    path: "/shipments",
    bg: "#e3f2fd",
  },
  {
    icon: <WarehouseIcon sx={{ fontSize: 60, color: "#2e7d32" }} />,
    title: "Warehouse Inventory",
    description: "Manage and monitor warehouse inventory effectively.",
    path: "/warehouses",
    bg: "#e8f5e9",
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 60, color: "#6a1b9a" }} />,
    title: "Analytics Dashboard",
    description: "Gain insights with smart logistics analytics tools.",
    path: "/dashboard",
    bg: "#f3e5f5",
  },
];

const Home = () => {
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
      const res  = await axios.get("/getAllBookShipments");
      const bookings = res.data.data;
      console.log(bookings);
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
  ];

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "80vh",
        background: "linear-gradient(135deg, #e0f7fa, #fff3e0)",
      }}
    >
      {/* Hero Section */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#1a237e" }}
        >
          Logistics Management System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Manage your shipments, warehouses, and drivers from one central
          dashboard.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/dashboard"
          sx={{
            backgroundColor: "#0288d1",
            "&:hover": { backgroundColor: "#0277bd" },
          }}
        >
          Go to Dashboard
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={6}
              sx={{
                backgroundColor: feature.bg,
                borderRadius: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={feature.path}
                sx={{ p: 3, textAlign: "center" }}
              >
                {feature.icon}
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#333", mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Order Pie Chart */}
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Shipment Request Status
        </Typography>
        <PieChart
          series={[
            {
              data: orderData.filter((item) => item.value > 0),
              innerRadius: 50,
              outerRadius: 120,
              paddingAngle: 3,
              cornerRadius: 5,
            },
          ]}
          height={300}
          width={320}
        />
        <Typography variant="caption" color="textSecondary">
          Order Status Breakdown
        </Typography>
      </Stack>
    </Box>
  );
};

export default Home;
