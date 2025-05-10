const BookShipment = require("../../models/bookShipmentSchema"); // adjust path if needed


const Shipment = require("../../models/shipment");

// Controller for creating a BookShipment
const createBookShipment = async (req, res) => {
  try {
    // Extract the Shipment ID from URL parameters
    const { id } = req.params;

    // Validate that the shipment ID exists
    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res
        .status(404)
        .json({ success: false, message: "Shipment not found" });
    }

    // Create a new BookShipment entry with the request body
    const newBookShipment = new BookShipment({
      ...req.body,
      shipmentId: id, // Link the BookShipment to the Shipment via shipmentId
    });

    // Save the new BookShipment
    const savedBookShipment = await newBookShipment.save();

    // After creating the BookShipment, update the Shipment to include this BookShipment ID in its 'requests' array
    shipment.requests.push(savedBookShipment._id);

    // Save the updated Shipment
    await shipment.save();

    // Return the created BookShipment as a response
    res.status(201).json({
      success: true,
      message: "BookShipment created and linked to Shipment",
      data: savedBookShipment,
    });
  } catch (err) {
    // Handle any errors and send a response
    console.error("Error creating BookShipment:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};




// Get all booked shipments
const getAllBookShipments = async (req, res) => {
  try {
    const shipments = await BookShipment.find().populate(
      "customerId",
      "name email"
    );
    res.status(200).json({ success: true, data: shipments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single booked shipment by ID
const getBookShipmentById = async (req, res) => {
  try {
    const shipment = await BookShipment.findById(req.params.id).populate(
      "customerId"
    );
    if (!shipment) {
      return res
        .status(404)
        .json({ success: false, message: "Shipment not found" });
    }
    res.status(200).json({ success: true, data: shipment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a booked shipment
const updateBookShipment = async (req, res) => {
  try {
    const shipment = await BookShipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!shipment) {
      return res
        .status(404)
        .json({ success: false, message: "Shipment not found" });
    }
    res.status(200).json({ success: true, data: shipment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a booked shipment
const deleteBookShipment = async (req, res) => {
  try {
    const shipment = await BookShipment.findByIdAndDelete(req.params.id);
    if (!shipment) {
      return res
        .status(404)
        .json({ success: false, message: "Shipment not found" });
    }
    res.status(200).json({ success: true, message: "Shipment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBookShipment,
  getAllBookShipments,
  getBookShipmentById,
  updateBookShipment,
  deleteBookShipment,
};
