import React from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

const BoxTitle = styled.div`
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`

export { Box, BoxTitle, List };
