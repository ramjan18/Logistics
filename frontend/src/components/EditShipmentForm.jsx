import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import {
  Person,
  Phone,
  LocationOn,
  LocalShipping,
  Scale,
  Category,
  CalendarToday,
  AssignmentInd,
  DriveEta,
} from "@mui/icons-material";
import axios from "../utils/axios";

const EditShipmentForm = ({ shipment, onClose }) => {
 
  
  const [form, setForm] = useState({ ...shipment });
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("/getUserByRole/Driver");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
     console.log(shipment);
    fetchDrivers();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/updateShipment/${shipment._id}`, form);
      alert("Shipment updated successfully");
      onClose();
    } catch (err) {
      console.error("Error updating shipment:", err);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
        ✏️ Edit Shipment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Sender Name"
              name="senderName"
              value={form.senderName}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sender Phone"
              name="senderPhone"
              value={form.senderPhone}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pickup Address"
              name="pickupAddress"
              value={form.pickupAddress}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              name="deliveryAddress"
              value={form.deliveryAddress}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalShipping />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Package Weight (kg)"
              name="packageWeight"
              type="number"
              value={form.packageWeight}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Scale />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Package Type"
              name="packageType"
              value={form.packageType}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Category />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Delivery Date"
              name="deliveryDate"
              type="date"
              value={form.deliveryDate?.slice(0, 10)}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentInd />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="Picked Up">Picked Up</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Driver"
              name="driver"
              value={form.driver}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveEta />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Unassigned</MenuItem>
              {drivers.map((d) => (
                <MenuItem key={d._id} value={d._id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditShipmentForm;
