import React from "react";
import "../cssfile/Navbar1.css";

function NavbarBL() {
  const handleLogout = () => {
    // Optional: Clear any stored data such as authentication tokens
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };

  return (
    <div className="navbar11 navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <div
          style={{ fontSize: 35, color: "#ffd230" }}
          className="btn btn-ghost text-x-3"
        >
          BUZZBLEN
        </div>
      </div>

      <div style={{ color: "white" }} className="navbar-end">
      
      </div>
    </div>
  );s
}

export default NavbarBL;
