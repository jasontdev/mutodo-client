import React from "react";
import styled from "styled-components";
import { useAuth } from "./auth";
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
  const auth = useAuth();
  return (
    <NavbarContainer>
      <NavbarBrand>mutodo</NavbarBrand>
      <NavbarLinks>
        {auth.getAccessToken() ? (
          <div>Sign out</div>
        ) : (
          <a href={auth.loginUri()}>Login</a>
        )}
      </NavbarLinks>
    </NavbarContainer>
  );
}
