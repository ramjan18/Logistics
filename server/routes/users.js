const express = require("express");
const User = require("../models/userSchema.js");
const { authorizeRoles } = require("../middlewares/auth.js")


const router = express.Router();
const { getUsersByRole } = require("../controllers/user/getUserByRole.js");
const { getAllUsers } = require("../controllers/user/getAllUsers.js");

router.get('/getAllUsers', getAllUsers);
router.get("/getUserByRole/:role", getUsersByRole);

module.exports = router;