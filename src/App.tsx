import React from "react";
import Navbar from "./Navbar";
import { Layout, CenteredContent } from "./layout";
import { FlexRowJustifyCenter } from "./ui-components";

export default function App() {
  return (
    <Layout>
      <Navbar title="Mutodo" />
      <CenteredContent>
        <FlexRowJustifyCenter>
          <h1>Welcome to Mutodo</h1>
        </FlexRowJustifyCenter>
          <p>Mutodo is a multi-user task manager. Friends, teams and families can create,
          share and complete todo lists together remotely.</p>
      </CenteredContent>
    </Layout>
  );
}
