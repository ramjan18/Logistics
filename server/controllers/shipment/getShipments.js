const Shipment = require('../../models/shipmentSchema')

 const getAllShipments = async (req, res) => {
  try {
const shipments = await Shipment.find()
  .populate("driver", "name") // populate the 'driver' field with only the 'name' from User model
  .sort({ createdAt: -1 });
 // latest first
    res.status(200).json(shipments);
  } catch (error) {
    console.error("Error fetching shipments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {getAllShipments};