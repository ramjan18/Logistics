const express = require("express");
const User = require("../models/userSchema.js");
const { authorizeRoles } = require("../middlewares/auth.js")


const router = express.Router();

router.get('/', authorizeRoles('Admin'), async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);


  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;