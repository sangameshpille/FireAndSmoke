import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import VehicleLog from "./components/vehiclelog/VehicleLog";
import DeviceHealthMonitor from "./components/vehiclelog/DeviceHealthMonitor";
import ProtectedRoute from "./components/routes/ProtectedRoute"; // Adjust the path as needed

const App = () => {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<VehicleLog />} />} />
        <Route path="/device_health_monitor" element={<ProtectedRoute element={<DeviceHealthMonitor />} />} />
      </Routes>
    </Router>
  );
};

export default App;
