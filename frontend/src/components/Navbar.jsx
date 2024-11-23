import React from "react";
import { Link } from "react-router-dom";
import "../cssfile/Navbar1.css";

function Navbar() {
  const handleLogout = () => {
    // Optional: Clear any stored data such as authentication tokens
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };

  return (
    <div className="navbar11 navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                style={{ color: "white" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/Homepage">Homepage</Link>
            </li>
        
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <div
          style={{ fontSize: 35, color: "#ffd230" }}
          className="btn btn-ghost text-x-3"
        >
          BUZZBLEN
        </div>
      </div>

      <div style={{ color: "white" }} className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              style={{
                width: "fit-content",
                height: "fit-content",
                display: "inline-block",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 mr-2 ml-2 rounded-full ring ring-offset-2">
            <img src="https://avatars.githubusercontent.com/u/143784469?v=4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
