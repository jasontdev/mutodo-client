import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import layout from "./global.module.css";
import styles from "./form.module.css";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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
      navigate("/dash", { state: { jwt: data.jwt } }),
  });

  async function attemptLogin() {
    const { email, password } = credentials;
    return new Promise(async (resolve, reject) => {
      const request = new Request("http://localhost:4000/auth/login");
      const response = await fetch(request, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        resolve(await response.json());
      } else {
        reject("Failed to authenticate");
      }
    });
  }

  return (
    <div className={layout.layoutContainer}>
      <div className={layout.centeredContent}>
        <div className={styles.form}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit((formData) => setCredentials(formData))}>
            <div className={styles.formColumn}>
              <div className={styles.formRow}>
                <input
                  className={styles.textInput}
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <div className={styles.formRow}>
                <input
                  className={styles.textInput}
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              <div className={styles.formRowCentered}>
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
