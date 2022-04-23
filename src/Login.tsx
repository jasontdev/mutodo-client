import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "./auth";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code !== null) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("client_id", import.meta.env.VITE_OAUTH2_CLIENT_ID);
      params.append("redirect_uri", import.meta.env.VITE_OAUTH2_REDIRECT_URI);
      params.append("scope", "openid");

      fetch(`${import.meta.env.VITE_OAUTH2_ENDPOINT}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => response.json())
        .then((json) => {
          auth.setAccessToken(json.access_token);
          navigate("/home");
        });
    }
  });

  return <div>Awaiting login result...</div>;
}
