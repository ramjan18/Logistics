const User = require("../../models/userSchema");

// GET /users/role/:role
const getUsersByRole = async (req, res) => {
  const { role } = req.params;

  // Validate role
  const validRoles = ["Admin", "Manager", "Customer", "Driver"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  try {
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users by role:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getUsersByRole };
