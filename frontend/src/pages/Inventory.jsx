import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import axios from "../utils/axios";
import AddInventoryForm from "../components/AddInventoryForm";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("/getAllInventory");
      setInventory(res.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleModalOpen = () => {
    setEditItem(null);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    fetchInventory();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      try {
        await axios.delete(`/inventory/${id}`);
        fetchInventory();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          📦 Inventory List
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          Add Inventory
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <InventoryIcon fontSize="small" sx={{ mr: 1 }} />
                Item Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
                Category
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Unit
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Reorder Level
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <WarehouseIcon fontSize="small" sx={{ mr: 1 }} />
                Warehouse
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inventory.map((item, index) => {
              const isLow = item.quantity <= item.reorderLevel;
              return (
                <TableRow
                  key={item._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell
                    sx={{
                      color: isLow ? "error.main" : "success.main",
                      fontWeight: 500,
                    }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{item.warehouse?.name || "N/A"}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            {editItem ? "✏️ Edit Inventory Item" : "➕ Add Inventory Item"}
          </Typography>
          <AddInventoryForm onClose={handleModalClose} editItem={editItem} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Inventory;
