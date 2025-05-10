import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "../utils/axios";

const AddInventoryForm = ({ onClose, editItem }) => {
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unit: "pcs",
    reorderLevel: "",
    warehouse: "",
  });

  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("/getWarehouses");
      setWarehouses(res.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
    if (editItem) {
      setForm({
        itemName: editItem.itemName,
        category: editItem.category,
        quantity: editItem.quantity,
        unit: editItem.unit,
        reorderLevel: editItem.reorderLevel,
        warehouse: editItem.warehouse,
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`/editInventory/${editItem._id}`, form);
        alert("Inventory item updated successfully");
      } else {
        await axios.post("/addInventory", form);
        alert("Inventory item added successfully");
      }
      onClose();
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {editItem ? "Edit Inventory Item" : "Add Inventory Item"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Name"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Reorder Level"
                name="reorderLevel"
                type="number"
                value={form.reorderLevel}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select Warehouse</InputLabel>
                <Select
                  name="warehouse"
                  value={form.warehouse}
                  onChange={handleChange}
                  label="Select Warehouse"
                >
                  {warehouses.map((wh) => (
                    <MenuItem key={wh._id} value={wh._id}>
                      {wh.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {editItem ? "Update Inventory" : "Add Inventory"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddInventoryForm;
