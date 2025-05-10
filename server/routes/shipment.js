const express = require("express");

const {
  createBookShipment,
  getAllBookShipments,
  getBookShipmentById,
  updateBookShipment,
  deleteBookShipment,
} = require("../controllers/shipment/bookShipmentController.js");

const {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} = require("../controllers/shipment/shipmentController.js");

const router = express.Router();

router.post("/createShipment", createShipment);
router.get("/getAllShipments", getAllShipments);
router.get("/getShipmentById/:id", getShipmentById);
router.put("/updateShipment/:id", updateShipment);
router.delete("/deleteShipment/:id", deleteShipment);

router.post("/bookShipment/:id", createBookShipment);
router.get("/getAllBookShipments", getAllBookShipments);
router.get("/getBookingbyId/:id", getBookShipmentById);
router.put("/updateBooking/:id", updateBookShipment);
router.delete("/deleteBooking/:id", deleteBookShipment);

module.exports = router;