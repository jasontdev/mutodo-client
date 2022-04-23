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
  border-style: solid;
  border-width: 0.1rem;
  border-color: lightgrey;
  flex-direction: column;
`;

const FlexRowJustifyCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexRowAlignCenter = styled.div`
  display: flex;
  gap: 1rem;
`;

const ListItem = styled.div`
  padding: 0.5rem 2rem 0.5rem 2rem;
  &:hover {
    background-color: honeydew;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  height: 1.2rem;
  width: 1.2rem;

  &:checked {
    background-color: red;
  }
`;

export {
  Box,
  Button,
  Checkbox,
  FlexRowAlignCenter,
  FlexRowJustifyCenter,
  List,
  ListItem,
};
