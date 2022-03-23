import React from "react";
import styled from "styled-components";

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  width: min(100%, 400px);
  padding: 1rem;

  border-style: none;
  border-radius: 5px;
  box-shadow: 0px 3px 20px lightgray;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const TextInput = styled.input`
  border-radius: 3px;
  padding: 0.4rem;
  border-style: solid;
  font-size: large;
`;

const Button = styled.button`
  background-color: ghostwhite;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  border-style: solid;
  font-size: large;
  border-radius: 3px;
`;

export { FormBox, FormRow, FormColumn, TextInput, Button };
