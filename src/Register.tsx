import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { FormColumn, FormBox, FormRow, TextInput, Button } from "./forms";
import { CenteredContent } from "./layout";
import Navbar from "./Navbar";
import { postJson } from "./queries";

type LoginCredentials = {
  email: string;
  password: string;
};

type UserCredentials = {
  email: string;
  password: string;
  role: string;
};

export default function Register() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const { register, formState, handleSubmit } = useForm<LoginCredentials>();
  const navigate = useNavigate();
  useQuery(
    ["credentials", credentials.email, credentials.password],
    () => attemptRegister(),
    {
      enabled: formState.isSubmitted,
      onSuccess: () => navigate("/login"),
    }
  );

  async function attemptRegister() {
    return new Promise((resolve, reject) => {
      const { email, password } = credentials;
      postJson<UserCredentials>("http://localhost:4000/auth/register", {
        email,
        password,
        role: "user",
      }).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        } else {
          reject("Registration failed");
        }
      });
    });
  }

  return (
    <CenteredContent>
      <Navbar />
      <h2>Register</h2>
      <FormBox>
        <form onSubmit={handleSubmit((formData) => setCredentials(formData))}>
          <FormColumn>
            <FormRow>
              <TextInput placeholder="Email" {...register("email")} />
            </FormRow>
            <FormRow>
              <TextInput
                placeholder="Password"
                {...register("password")}
              ></TextInput>
            </FormRow>
            <FormRow>
              <Button>Register</Button>
            </FormRow>
            <FormRow>
              <div>
                Already registered? Login <Link to="/login">here</Link>.
              </div>
            </FormRow>
          </FormColumn>
        </form>
      </FormBox>
    </CenteredContent>
  );
}
