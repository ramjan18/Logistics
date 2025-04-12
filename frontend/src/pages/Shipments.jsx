import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Box,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    status: 'Pending',
    assignedDriver: '',
    eta: '',
  });

  const fetchShipments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/shipments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setShipments(res.data);
    } catch (err) {
      console.error('Error fetching shipments:', err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(res.data.filter((u) => u.role === 'Driver'));
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/shipments', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setForm({ origin: '', destination: '', status: 'Pending', assignedDriver: '', eta: '' });
      fetchShipments();
    } catch (err) {
      console.error('Error creating shipment:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/shipments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchShipments();
    } catch (err) {
      console.error('Error deleting shipment:', err);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchDrivers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shipments Management
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Origin"
          value={form.origin}
          onChange={(e) => setForm({ ...form, origin: e.target.value })}
          fullWidth margin="normal" required
        />
        <TextField
          label="Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          fullWidth margin="normal" required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status}
            label="Status"
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Transit">In Transit</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Assigned Driver</InputLabel>
          <Select
            value={form.assignedDriver}
            label="Assigned Driver"
            onChange={(e) => setForm({ ...form, assignedDriver: e.target.value })}
          >
            <MenuItem value="">None</MenuItem>
            {users.map((u) => (
              <MenuItem key={u._id} value={u._id}>
                {u.name || u.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="datetime-local"
          label="ETA"
          InputLabelProps={{ shrink: true }}
          value={form.eta}
          onChange={(e) => setForm({ ...form, eta: e.target.value })}
          fullWidth margin="normal" required
        />

        <Button type="submit" variant="contained" color="primary">
          Add Shipment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.length > 0 ? (
              shipments.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.origin}</TableCell>
                  <TableCell>{s.destination}</TableCell>
                  <TableCell>{s.status}</TableCell>
                  <TableCell>{s.assignedDriver?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {s.eta ? new Date(s.eta).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => handleDelete(s._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No shipments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Shipments;
