// controllers/warehouseController.js

const Warehouse = require("../../models/warehouseSchema");


const deleteWarehouse = async (req, res) => {
  const { id } = req.params;

  try {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    await warehouse.deleteOne(); // or use await Warehouse.findByIdAndDelete(id);

    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    console.error("Error deleting warehouse:", error);
    res.status(500).json({ message: "Failed to delete warehouse" });
  }
};

module.exports = { deleteWarehouse };
