import {  Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList"; // adjust path if needed
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home"; // optional
import Dashboard from "./pages/Dashboard"; // optional
import Navbar from "./components/Navbar"; // if you have a Navbar
import UserContext from "./context/UserContext";
import { useState } from "react";
import Shipments from "./pages/Shipments";
import Warehouses from "./pages/Warehouses";

function App() {

  const [user, setUser] = useState(null);

  return (
     <UserContext.Provider value={{ user, setUser }}>
       <>
    <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </>
      
    </UserContext.Provider>
   
  );
}

export default App;


