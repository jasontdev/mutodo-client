import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";
import { useAuth } from "./auth";
import { useQuery } from "react-query";

export default function Home() {
  const readUser = async () => {
    return fetch("http://localhost:4100/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.getAccessToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query User {
        user {
          id
          name
        }
      }
      `,
      }),
    }).then((res) => res.json());
  };
  const auth = useAuth();
  const { data } = useQuery("user", readUser);

  useEffect(() => {
    if (!auth.getAccessToken()) {
      window.location.replace(auth.loginUri());
    }
  });

  return (
    <CenteredContent>
      <Navbar />
      <h1>Tasklists</h1>
      {data ? (
        <h3>Hello, {data.data.user.name}, and welcome to Mutodo.</h3>
      ) : (
        <h3>Hello. Welcome to Mutodo.</h3>
      )}
    </CenteredContent>
  );
}
