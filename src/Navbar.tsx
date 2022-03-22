import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./navbar.css";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavbarBrand = styled.div`
  font-size: larger;
  font-weight: bold;
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <NavbarBrand>mutodo</NavbarBrand>
      <NavbarLinks>
        <NavLink to="/login">Login</NavLink>
      </NavbarLinks>
    </NavbarContainer>
  );
}
