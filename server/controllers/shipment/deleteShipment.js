const Shipment = require("../../models/shipmentSchema"); 

const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Shipment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error("Delete shipment error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {deleteShipment};
