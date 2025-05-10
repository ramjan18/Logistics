import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditShipmentForm from "../components/EditShipmentForm";

const getStatusChip = (status) => {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  switch (status.toLowerCase()) {
    case "delivered":
      return <Chip label={label} color="success" icon={<DoneIcon />} />;
    case "pending":
      return <Chip label={label} color="warning" icon={<PendingIcon />} />;
    case "cancelled":
      return <Chip label={label} color="error" icon={<CancelIcon />} />;
    default:
      return <Chip label={label} icon={<HelpOutlineIcon />} />;
  }
};

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    packageWeight: "",
    packageType: "",
  });

  const fetchShipments = async () => {
    try {
      const res = await axios.get("/getAllShipments");
      setShipments(res.data);
      console.log("shipments : ",res.data);
      
      const userRole = localStorage.getItem("role");
      setRole(userRole);
    } catch (err) {
      console.error("Error fetching shipments:", err);
    }
  };

  useEffect(() => {
    fetchShipments();
    const user = localStorage.getItem("role");
    if (user) setRole(role);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteShipment/${id}`);
      fetchShipments();
    } catch (err) {
      console.error("Error deleting shipment:", err);
    }
  };

  const handleEditClick = (shipment) => {
    setSelectedShipment(shipment);
    setOpenModal(true);
  };

  const handleRequestClick = (shipment) => {
    setSelectedShipment(shipment);
    setRequestModal(true);
  };
const handleRequestSubmit = async (e) => {
  e.preventDefault();
  try {
    // Get user from localStorage and parse it
    const user = localStorage.getItem("id");
    const userId = user;

    // Include customerId in formData
    const dataToSend = {
      ...formData,
      customerId: userId,
    };

    // Send POST request
    await axios.post(`/bookShipment/${selectedShipment._id}`, dataToSend, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Request sent successfully!");
    setRequestModal(false);
  } catch (err) {
    console.error("Error sending request:", err);
    alert("Failed to send request");
  }
};


  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedShipment(null);
    fetchShipments();
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          🚚 All Shipments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/bookShipmentForm"
        >
          + Add Shipment
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f4f8" }}>
            <TableRow>
              <TableCell>
                <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                Name
              </TableCell>
              <TableCell>
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                Email
              </TableCell>
              <TableCell>
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                Origin
              </TableCell>
              <TableCell>
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                Destination
              </TableCell>
              <TableCell>
                <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />
                Driver
              </TableCell>
              <TableCell>
                <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                Delivery Date
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.length > 0 ? (
              shipments.map((s, index) => (
                <TableRow
                  key={s._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <TableCell>{s.createdBy?.name}</TableCell>
                  <TableCell>{s.createdBy?.email}</TableCell>
                  <TableCell>{s.origin}</TableCell>
                  <TableCell>{s.destination}</TableCell>
                  <TableCell>
                    {s.assignedDriver?.name || "Unassigned"}
                  </TableCell>
                  <TableCell>
                    {new Date(s.deliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusChip(s.status)}</TableCell>
                  <TableCell>
                    {(role === "Admin" || role === "Manager") && (
                      <Box>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(s)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(s._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                    {role === "Customer" && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRequestClick(s)}
                      >
                        Request
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No shipments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* <Typography variant="h6" mb={2}>
            Edit Shipment
          </Typography> */}
          {selectedShipment && (
            <EditShipmentForm
              shipment={selectedShipment}
              onClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>

      {/* Request Modal */}
      <Modal open={requestModal} onClose={() => setRequestModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            width: 500,
            maxHeight: "90vh",
            overflowY: "auto",
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            📦 Send Shipment Request
          </Typography>
          <Box component="form" onSubmit={handleRequestSubmit}>
            <TextField
              fullWidth
              label="Sender Name"
              name="senderName"
              value={formData.senderName}
              onChange={handleFormChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Sender Phone"
              name="senderPhone"
              value={formData.senderPhone}
              onChange={handleFormChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pickup Address"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleFormChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Delivery Address"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleFormChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Package Weight (kg)"
              name="packageWeight"
              type="number"
              value={formData.packageWeight}
              onChange={handleFormChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Package Type"
              name="packageType"
              value={formData.packageType}
              onChange={handleFormChange}
              required
              margin="normal"
            >
              <MenuItem value="Document">Document</MenuItem>
              <MenuItem value="Box">Box</MenuItem>
              <MenuItem value="Pallet">Pallet</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              Submit Request
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Shipments;
