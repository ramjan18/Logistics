const router = require('express').Router();

const {addInventory} = require('../controllers/Inventory/addInventory');
const { getAllInventory } = require('../controllers/Inventory/getAllInventoryItems');
const {updateInventory} = require('../controllers/Inventory/editInventory');
const { getInventoryById } = require('../controllers/Inventory/getInventoryById');

router.post('/addInventory' , addInventory);
router.get('/getAllInventory', getAllInventory);
router.put('/editInventory/:id' , updateInventory);
router.get('/getInventory/:id' ,  getInventoryById);

module.exports = router;