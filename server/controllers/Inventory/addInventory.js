const Inventory = require('../../models/inventorySchema')
const Warehouse = require('../../models/warehouseSchema');

const addInventory = async (req, res) => {
  try {
    const { itemName, category, quantity, reorderLevel, warehouse, unit } =
      req.body;

    const warehouseExists = await Warehouse.findById(warehouse);
    if (!warehouseExists)
      return res.status(404).json({ message: "Warehouse not found" });

    const newInventory = new Inventory({
      itemName,
      category,
      quantity,
      reorderLevel,
      warehouse,
      unit,
    });

    await newInventory.save();
    res
      .status(201)
      .json({ message: "Inventory item added", inventory: newInventory });
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {addInventory};