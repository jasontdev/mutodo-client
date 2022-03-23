import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";

export default function Tasks() {
  return (
    <CenteredContent>
      <Navbar />
      <h1>Tasks</h1>
    </CenteredContent>
  );
}
