import React from "react";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";

export default function App() {
  return (
    <CenteredContent>
      <Navbar />
      <h1>Welcome to Mutodo</h1>
    </CenteredContent>
  );
}
