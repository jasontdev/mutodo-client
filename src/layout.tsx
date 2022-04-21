import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-color: whitesmoke;
`;

const CenteredContent = styled.div`
align-self: center;
  width: min(100%, 650px);
  height: 100%;
`;

export { Layout, CenteredContent };
