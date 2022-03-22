import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

const CenteredContent = styled.div`
  width: min(100%, 650px);
`;

export { Layout, CenteredContent };
