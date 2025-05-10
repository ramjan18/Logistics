import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";


export default function CreateShipmentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    status: "pending",
    deliveryDate: "",
    assignedDriver: "",
    warehouse: "",
    createdBy: "",
    requests: [],
  });

  const [drivers, setDrivers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch drivers, warehouses, users, and bookings
   const fetchData = async () => {
     const token = localStorage.getItem("token");
     const config = {
       headers: { Authorization: `Bearer ${token}` },
     };

     // Fetch Drivers
     try {
       const driverRes = await axios.get("/users/getUserByRole/Driver", config);
       setDrivers(driverRes.data);
       console.log(driverRes.data);
     } catch (error) {
       console.error(
         "Error fetching drivers:",
         error.response?.data || error.message
       );
     }

     // Fetch Warehouses
     try {
       const warehouseRes = await axios.get("/api/warehouses", config);
       setWarehouses(warehouseRes.data);
     } catch (error) {
       console.error(
         "Error fetching warehouses:",
         error.response?.data || error.message
       );
     }

     // Fetch All Users
     try {
       const userRes = await axios.get("/api/users", config);
       setUsers(userRes.data);
     } catch (error) {
       console.error(
         "Error fetching users:",
         error.response?.data || error.message
       );
     }

     // Fetch Book Shipments
    //  try {
    //    const bookingRes = await axios.get("/api/bookShipments", config);
    //    setBookings(bookingRes.data);
    //  } catch (error) {
    //    console.error(
    //      "Error fetching bookings:",
    //      error.response?.data || error.message
    //    );
    //  }
   };


    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      requests: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")
      console.log("user :" , id);
      
      await axios.post("/createShipment", {...formData, createdBy : id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Shipment created successfully!");
      navigate("/shipments");
    } catch (err) {
      console.error(err);
      alert("Failed to create shipment");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Shipment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="dispatched">Dispatched</MenuItem>
            <MenuItem value="in-transit">In-Transit</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Assigned Driver</InputLabel>
            <Select
              name="assignedDriver"
              value={formData.assignedDriver}
              onChange={handleChange}
              label="Assigned Driver"
            >
              <MenuItem value="">None</MenuItem>
              {drivers.map((driver) => (
                <MenuItem key={driver._id} value={driver._id}>
                  {driver.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl fullWidth margin="normal">
            <InputLabel>Warehouse</InputLabel>
            <Select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              label="Warehouse"
            >
              <MenuItem value="">None</MenuItem>
              {warehouses.map((w) => (
                <MenuItem key={w._id} value={w._id}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
          >
            Create Shipment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
