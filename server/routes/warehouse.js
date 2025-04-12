const express = require("express");
const Warehouse = require("../models/warehouseSchema.js")
const {authorizeRoles} = require("../middlewares/auth.js")


const router = express.Router();

router.get('/', async (req, res) => {
  const warehouses = await Warehouse.find();
  res.json(warehouses);
});

router.post('/', authorizeRoles('Admin', 'Manager'), async (req, res) => {
  const warehouse = new Warehouse(req.body);
  await warehouse.save();
  res.status(201).json(warehouse);
});

router.put('/:id', authorizeRoles('Admin', 'Manager'), async (req, res) => {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(warehouse);
});

router.delete('/:id', authorizeRoles('Admin'), async (req, res) => {
  await Warehouse.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;