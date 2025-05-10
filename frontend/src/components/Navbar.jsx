import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [role , setRole] = useState("");
  useEffect(() => {
    const res = localStorage.getItem("role");
    setRole(res);
    console.log(res);
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2e3b55" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LogiTrack
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/shipments">
                Shipments
              </Button>
              <Button color="inherit" component={Link} to="/requests">
                Requests
              </Button>
              {(role === "Admin" ||
                role === "Manager") && (
                  <Button color="inherit" component={Link} to="/inventory">
                    Inventory
                  </Button>
                )}
              <Button color="inherit" component={Link} to="/warehouses">
                Warehouses
              </Button>
              {(role === "Admin" || role === "Manager") && (
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
              )}

              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
