import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
  IconButton,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "../utils/axios";

const statusColors = {
  pending: "warning",
  dispatched: "info",
  "in-transit": "primary",
  delivered: "success",
  cancelled: "error",
};

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [role, setRole] = useState("");

  const fetchData = async () => {
    const res = await axios.get("/getAllBookShipments");
    setRequests(res.data.data);
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (booking) => {
    setSelectedBooking({ ...booking });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedBooking(null);
  };
  

  const handleChange = (e) => {
    setSelectedBooking({ ...selectedBooking, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/updateBooking/${selectedBooking._id}`, selectedBooking);
      fetchData();
      handleModalClose();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteBookShipment/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        📦 Booking Requests
      </Typography>

      <TableContainer component={Paper} elevation={5}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Pickup</strong>
              </TableCell>
              <TableCell>
                <strong>Delivery</strong>
              </TableCell>
              <TableCell>
                <strong>Weight</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((r, index) => (
              <TableRow
                key={r._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" }}
              >
                <TableCell>{r.senderName}</TableCell>
                <TableCell>
                  <Tooltip title="Sender Phone">
                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon fontSize="small" color="primary" />
                      {r.senderPhone}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" color="error" />
                    {r.pickupAddress}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" color="success" />
                    {r.deliveryAddress}
                  </Box>
                </TableCell>
                <TableCell>{r.packageWeight} kg</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocalMallIcon fontSize="small" />
                    {r.packageType}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={r.status}
                    color={statusColors[r.status?.toLowerCase()] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {(role === "Admin" || role === "Manager") && (
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(r)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(r._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  {role === "Customer" && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditClick(r)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            p: 4,
            backgroundColor: "#fff",
            width: 500,
            margin: "100px auto",
            borderRadius: 3,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            ✏️ Edit Booking
          </Typography>
          <TextField
            name="senderName"
            label="Sender Name"
            value={selectedBooking?.senderName || ""}
            onChange={handleChange}
          />
          <TextField
            name="senderPhone"
            label="Sender Phone"
            value={selectedBooking?.senderPhone || ""}
            onChange={handleChange}
          />
          <TextField
            name="pickupAddress"
            label="Pickup Address"
            value={selectedBooking?.pickupAddress || ""}
            onChange={handleChange}
          />
          <TextField
            name="deliveryAddress"
            label="Delivery Address"
            value={selectedBooking?.deliveryAddress || ""}
            onChange={handleChange}
          />
          <TextField
            name="packageWeight"
            label="Package Weight"
            type="number"
            value={selectedBooking?.packageWeight || ""}
            onChange={handleChange}
          />
          <TextField
            name="packageType"
            label="Package Type"
            value={selectedBooking?.packageType || ""}
            onChange={handleChange}
          />
          {role !== "Customer" && (
            <TextField
              name="status"
              select
              label="Status"
              value={selectedBooking?.status || ""}
              onChange={handleChange}
            >
              {[
                "pending",
                "dispatched",
                "in-transit",
                "delivered",
                "cancelled",
              ].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default BookingRequests;
