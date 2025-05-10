// controllers/warehouseController.js

const Warehouse = require("../../models/warehouseSchema"); 


const updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const { name, address, location, latitude, longitude, capacity } = req.body;

  try {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    warehouse.name = name || warehouse.name;
    warehouse.address = address || warehouse.address;
    warehouse.location = location || warehouse.location;
    warehouse.latitude = latitude || warehouse.latitude;
    warehouse.longitude = longitude || warehouse.longitude;
    warehouse.capacity = capacity || warehouse.capacity;

    const updatedWarehouse = await warehouse.save();

    res.status(200).json(updatedWarehouse);
  } catch (error) {
    console.error("Error updating warehouse:", error);
    res.status(500).json({ message: "Failed to update warehouse" });
  }
};

module.exports = { updateWarehouse };
