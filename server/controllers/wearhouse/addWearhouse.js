// controllers/warehouseController.js

const Warehouse = require("../../models/warehouseSchema");
// const axios = require("axios");

const addWarehouse = async (req, res) => {
  try {
    const { name, address, currentStock , capacity } = req.body;

    // Validate required fields
    if (!name || !address) {
      return res
        .status(400)
        .json({ message: "Name and address are required." });
    }

    // Geocode address using Google Maps API or similar
    // const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Store in .env
    // const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //   address
    // )}&key=${apiKey}`;

    // const geoRes = await axios.get(geocodeUrl);
    // const results = geoRes.data.results;

    // if (results.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid address or location not found." });
    // }

    // const { lat, lng } = results[0].geometry.location;

    const newWarehouse = new Warehouse({
      name,
      address,
    //   location: { lat, lng },
        capacity,
      currentStock: currentStock || 0,
    });

    await newWarehouse.save();

    res
      .status(201)
      .json({
        message: "Warehouse added successfully",
        warehouse: newWarehouse,
      });
  } catch (err) {
    console.error("Error adding warehouse:", err);
    res.status(500).json({ message: "Server error while adding warehouse." });
  }
};

module.exports = {
  addWarehouse,
};
