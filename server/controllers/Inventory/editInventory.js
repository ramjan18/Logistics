const Inventory = require('../../models/inventorySchema');

 const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem)
      return res.status(404).json({ message: "Inventory item not found" });

    res
      .status(200)
      .json({ message: "Inventory updated", inventory: updatedItem });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {updateInventory};