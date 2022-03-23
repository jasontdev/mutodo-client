import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { Layout, CenteredContent } from "./layout";
import { FormBox, FormRow, FormColumn, TextInput, Button } from "./forms";
type LoginCredentials = {
  email: string;
  password: string;
};

type SuccessfulResponseBody = {
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
    onSuccess: (data: SuccessfulResponseBody) =>
      navigate("/tasks", { state: { jwt: data.jwt } }),
  });

  async function attemptLogin() {
    const { email, password } = credentials;
    return new Promise((resolve, reject) => {
      const request = new Request("http://localhost:4000/auth/login");
      fetch(request, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        } else {
          reject("Failed to authenticate");
        }
      });
    });
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
