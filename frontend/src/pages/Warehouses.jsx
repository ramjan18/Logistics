import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import axios from "../utils/axios"; // Your configured axios instance
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Warehouses = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    currentStock: "",
    capacity: "",
  });

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [role,setRole] = useState("");

  useEffect(() => {
    const res= localStorage.getItem("role");
    setRole(res);
    console.log("wearhouse : ",res);
    
     fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("/getWarehouses");
      setWarehouses(res.data);
    } catch (err) {
      console.error("Error fetching warehouses:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = editingWarehouse
        ? await axios.put(`/editWarehouse/${editingWarehouse._id}`, formData)
        : await axios.post("/addWarehouse", formData);
      setMessage("Warehouse added/updated successfully!");
      setFormData({ name: "", address: "", currentStock: "", capacity: "" }); // Reset form
       fetchWarehouses(); // Refresh the warehouse list
      setEditingWarehouse(null); // Reset editing state
    } catch (err) {
      console.error(err);
      setMessage("Failed to add/update warehouse.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (warehouse) => {
    setFormData({
      name: warehouse.name,
      address: warehouse.address,
      currentStock: warehouse.currentStock,
      capacity: warehouse.capacity,
    });
    setEditingWarehouse(warehouse);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteWarehouse/${id}`);
      setMessage("Warehouse deleted successfully!");
      fetchWarehouses();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete warehouse.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        {(role === "Admin" || role === "Manager") && (
          <Box>
            <Typography variant="h5" gutterBottom>
              {editingWarehouse ? "Edit Warehouse" : "Add New Warehouse"}
            </Typography>
 
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Warehouse Name"
                    name="name"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    fullWidth
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Current Stock"
                    name="currentStock"
                    type="number"
                    fullWidth
                    value={formData.currentStock}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    fullWidth
                    required
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading
                      ? "Adding..."
                      : editingWarehouse
                      ? "Save Changes"
                      : "Add Warehouse"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
        {message && (
          <Typography color="success.main" mt={2}>
            {message}
          </Typography>
        )}

        <Typography variant="h6" mt={5}>
          Warehouse List
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Current Stock</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse._id}>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.address}</TableCell>
                  <TableCell>{warehouse.currentStock}</TableCell>
                  <TableCell>{warehouse.capacity}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(warehouse)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(warehouse._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Warehouses;
