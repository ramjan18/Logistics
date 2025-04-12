const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipmentSchema');
const Warehouse = require('../models/warehouseSchema');
const { verifyToken } = require('../middlewares/auth');

// GET /api/analytics/shipments
router.get('/shipments', verifyToken, async (req, res) => {
  try {
    const statusCounts = await Shipment.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const formatted = statusCounts.map(item => ({
      status: item._id,
      count: item.count
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shipment analytics.' });
  }
});

// GET /api/analytics/inventory
router.get('/inventory', verifyToken, async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    const inventory = [];

    warehouses.forEach(warehouse => {
      warehouse.inventory.forEach(item => {
        const existing = inventory.find(i => i.item === item.name);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          inventory.push({ item: item.name, quantity: item.quantity });
        }
      });
    });

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory data.' });
  }
});

module.exports = router;
