import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0 1rem 0;
  box-shadow: 0 0 1rem lightgrey;
`;

const BoxTitle = styled.div`
  font-weight: bold;
`;

const Button = styled.div`
  display: table;
  padding: 0.8rem 2rem 0.8rem 2rem;
  color: white;
  background-color: royalblue;
  border-radius: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Box, BoxTitle, Button, List };
