import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Box,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    inventory: [{ item: '', quantity: '' }],
  });

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/warehouses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWarehouses(res.data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanedInventory = form.inventory.filter(i => i.item && i.quantity);
      await axios.post(
        'http://localhost:5000/api/warehouses',
        { ...form, inventory: cleanedInventory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setForm({ name: '', location: '', inventory: [{ item: '', quantity: '' }] });
      fetchWarehouses();
    } catch (error) {
      console.error('Error adding warehouse:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/warehouses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  const handleInventoryChange = (index, field, value) => {
    const updated = [...form.inventory];
    updated[index][field] = value;
    setForm({ ...form, inventory: updated });
  };

  const addInventoryItem = () => {
    setForm({ ...form, inventory: [...form.inventory, { item: '', quantity: '' }] });
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Warehouse Management
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth margin="normal"
          required
        />
        <TextField
          label="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          fullWidth margin="normal"
          required
        />

        <Typography variant="h6" mt={2}>Inventory</Typography>
        {form.inventory.map((inv, index) => (
          <Box key={index} display="flex" gap={2} mt={1}>
            <TextField
              label="Item"
              value={inv.item}
              onChange={(e) => handleInventoryChange(index, 'item', e.target.value)}
              required
            />
            <TextField
              label="Quantity"
              type="number"
              value={inv.quantity}
              onChange={(e) => handleInventoryChange(index, 'quantity', e.target.value)}
              required
            />
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          sx={{ mt: 1, mb: 2 }}
          onClick={addInventoryItem}
        >
          Add Inventory Item
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Add Warehouse
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Inventory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((w) => (
              <TableRow key={w._id}>
                <TableCell>{w.name}</TableCell>
                <TableCell>{w.location}</TableCell>
                <TableCell>
                  {w.inventory.length > 0
                    ? w.inventory.map((item, i) => (
                        <div key={i}>
                          {item.item} ({item.quantity})
                        </div>
                      ))
                    : 'No inventory'}
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(w._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Warehouses;
