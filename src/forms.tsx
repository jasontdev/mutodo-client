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

export { FormBox, FormRow, FormColumn };
