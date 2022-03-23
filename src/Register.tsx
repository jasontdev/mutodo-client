import React from "react";
import { FormColumn, FormBox, FormRow, TextInput, Button } from "./forms";
import { CenteredContent } from "./layout";
import Navbar from "./Navbar";

export default function Register() {
  return (
    <CenteredContent>
      <Navbar />
      <h2>Register</h2>
      <FormBox>
        <form>
          <FormColumn>
            <FormRow>
              <TextInput placeholder="Email" />
            </FormRow>
            <FormRow>
              <TextInput placeholder="Password"></TextInput>
            </FormRow>
            <FormRow>
              <Button>Register</Button>
            </FormRow>
          </FormColumn>
        </form>
      </FormBox>
    </CenteredContent>
  );
}
