const express = require("express");
const Shipment = require("../models/shipmentSchema.js");
const { authorizeRoles } = require("../middlewares/auth.js")


const router = express.Router();

router.get('/', async (req, res) => {
  const shipments = await Shipment.find().populate('assignedDriver');
  res.json(shipments);
});

router.post('/',
    authorizeRoles('Admin', 'Manager'),
 async (req, res) => {
  const shipment = new Shipment(req.body);
  await shipment.save();
  res.status(201).json(shipment);
});

router.put('/:id', authorizeRoles('Admin', 'Manager'), async (req, res) => {
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(shipment);
});

router.delete('/:id', authorizeRoles('Admin'), async (req, res) => {
  await Shipment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;