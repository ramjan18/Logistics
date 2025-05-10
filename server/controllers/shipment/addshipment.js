
const Shipment = require('../../models/bookShipmentSchema')

 const bookShipment = async (req, res) => {
  try {
    const id = req.params ;
    const {
      senderName,
      senderPhone,
      pickupAddress,
      deliveryAddress,
      packageWeight,
      packageType,
      deliveryDate,
    } = req.body;

    // Validate required fields (optional if using frontend/Formik+Yup)
    if (
      !senderName ||
      !senderPhone ||
      !pickupAddress ||
      !deliveryAddress ||
      !packageWeight ||
      !packageType ||
      !deliveryDate
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const ship = await Ship

    const shipment = new Shipment({
      senderName,
      senderPhone,
      pickupAddress,
      deliveryAddress,
      packageWeight,
      packageType,
      deliveryDate,
    });

    await shipment.save();

    res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { bookShipment };