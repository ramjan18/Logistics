// controllers/warehouseController.js

const Warehouse = require("../../models/warehouseSchema"); 


const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });
    res.status(200).json(warehouses);
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ message: "Failed to retrieve warehouses" });
  }
};

module.exports = { getWarehouses };
