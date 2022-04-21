import React from "react";
import styled from "styled-components";
import { useAuth } from "./auth";

const NavbarContainer = styled.div`
  background-color: #6f00fe;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 1rem;
  box-shadow: 0 0.1rem 1rem grey;
  margin-bottom: 1rem;
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

export default function Navbar({title}: {title: string}) {
  const auth = useAuth();
  return (
    <NavbarContainer>
      <NavbarBrand>{title}</NavbarBrand>
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
