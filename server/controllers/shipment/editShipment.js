const Shipment = require("../../models/shipmentSchema");

// PUT /api/shipments/:id
const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;

    // If driver is an empty string, convert to null
    if (req.body.driver === "") {
      req.body.driver = null;
    }

    const updatedShipment = await Shipment.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate("driver", "name");

    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json(updatedShipment);
  } catch (err) {
    console.error("Error updating shipment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateShipment,
};
