const express = require("express");

const {authorizeRoles} = require("../middlewares/auth.js")
const {addWarehouse} = require("../controllers/wearhouse/addWearhouse.js");
const { getWarehouses } = require("../controllers/wearhouse/getAllWarehouses.js");
const { updateWarehouse } = require("../controllers/wearhouse/editWarehouse.js");
const { deleteWarehouse } = require("../controllers/wearhouse/deleteWarehouse.js");

const router = express.Router();

router.post('/addWarehouse' , addWarehouse);
router.get("/getWarehouses", getWarehouses);
router.put("/editWarehouse/:id", updateWarehouse);
router.delete("/deleteWarehouse/:id", deleteWarehouse);

module.exports = router;