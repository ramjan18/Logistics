const Inventory = require('../../models/inventorySchema');

 const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate(
      "warehouse",
      "name location"
    );
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {getAllInventory}