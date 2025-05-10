const mongoose = require("mongoose");
const Shipment = require("../../models/shipment") // adjust path


// Create a new shipment
 const createShipment = async (req, res) => {
  try {
    const { createdBy } = req.body;

    if (!createdBy) {
      return res.status(400).json({ error: "Missing 'createdBy' field" });
    }

    const shipment = await Shipment.create({ ...req.body, createdBy });

    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create shipment",
      details: err.message,
    });
  }
};


// Get all shipments
 const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("assignedDriver", "name email")
      .populate("requests")
      .populate("createdBy", "name email");

    res.status(200).json(shipments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch shipments", details: err.message });
  }
};

// Get a single shipment by ID
 const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id)
      .populate("assignedDriver", "name email")
      .populate("requests")
      .populate("createdBy", "name email");

    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.status(200).json(shipment);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch shipment", details: err.message });
  }
};

// Update a shipment
 const updateShipment = async (req, res) => {
  try {
    const updated = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("assignedDriver", "name email")
      .populate("requests")
      .populate("createdBy", "name email");

    if (!updated) return res.status(404).json({ error: "Shipment not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update shipment", details: err.message });
  }
};

// Delete a shipment
 const deleteShipment = async (req, res) => {
  try {
    const deleted = await Shipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Shipment not found" });
    res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete shipment", details: err.message });
  }
};


module.exports = {updateShipment ,createShipment , deleteShipment ,getAllShipments , getShipmentById}