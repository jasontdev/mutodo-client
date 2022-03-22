import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-brand">mutodo</div>
      <div className="navbar-links">
        <NavLink className="navbar-link" to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
}
