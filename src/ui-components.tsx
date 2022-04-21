import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.1rem 1rem lightgrey;
`;

const Button = styled.div`
  display: table;
  color: white;
  background-color: #6f00fe;
  padding: 0.2rem 1rem 0.2rem 1rem;
  border-radius: 0.25rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Box, Button, List };
