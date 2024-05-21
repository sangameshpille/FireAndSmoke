import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/teaaa-white.png";
import { MdDashboard, MdDirectionsCar, MdAssignment } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Extract the current pathname from the location object
    const currentPathname = location.pathname;

    // Find the active item based on the current pathname and URL name
    const items = [
      { pathname: "/dashboard", name: "Fire And Smoke Detection Log" },
      { pathname: "/device_health_monitor", name: "Device health monitor" }

      // Add more items as needed
    ];

    const activeItem = items.find(
      (item) =>
        item.pathname === currentPathname ||
        currentPathname.startsWith(item.pathname + "/")
    );

    if (activeItem) {
      setActiveItem(activeItem.name);
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="logo">
        <img src={logo} alt="logo1" />
      </div>
      <ul>
        <li className={activeItem === "Fire And Smoke Detection Log" ? "active" : ""}>
          <Link to="/dashboard">
            <MdDirectionsCar className="icon" />
            Fire And Smoke Detection Log
          </Link>
        </li>
        <li className={activeItem === "Device health monitor" ? "active" : ""}>
          <Link to="/device_health_monitor">
            <MdAssignment className="icon" />
            Device Health Monitor
          </Link>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
