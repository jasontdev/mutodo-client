import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { Layout, CenteredContent } from "./layout";
import { FormBox, FormRow, FormColumn, TextInput, Button } from "./forms";
import { postJson } from "./queries";
type LoginCredentials = {
  email: string;
  password: string;
};

type Token = {
  jwt: string;
};

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const { register, formState, handleSubmit } = useForm<LoginCredentials>();
  const navigate = useNavigate();
  useQuery(["credentials", credentials], () => attemptLogin(), {
    enabled: formState.isSubmitted,
    onSuccess: (data: Token) =>
      navigate("/tasks", { state: { jwt: data.jwt } }),
  });

  async function attemptLogin() {
    return postJson<LoginCredentials, Token>(
      "http://localhost:4000/auth/login",
      credentials
    );
  }

  return (
    <Layout>
      <CenteredContent>
        <h1>Login</h1>
        <FormBox>
          <form onSubmit={handleSubmit((formData) => setCredentials(formData))}>
            <FormColumn>
              <FormRow>
                <TextInput placeholder="Email" {...register("email")} />
              </FormRow>
              <FormRow>
                <TextInput placeholder="Password" {...register("password")} />
              </FormRow>
              <FormRow>
                <Button type="submit">Login</Button>
              </FormRow>
              <div>
                New to Motudo? Register <Link to="/register">here</Link>.
              </div>
            </FormColumn>
          </form>
        </FormBox>
      </CenteredContent>
    </Layout>
  );
}
