import React, { useEffect } from "react";
import { useAuth } from "./auth";
import { useQuery } from "react-query";
import Navbar from "./Navbar";
import NewUser from "./NewUser";
import { CenteredContent } from "./layout";
import graphql from "./graphql";

const userQuery = `
      query User {
        user {
          id
          name
        }
      }
      `;

export default function Home() {
  const auth = useAuth();
  const { data } = useQuery(["user"], () =>
    graphql.query(
      "http://localhost:4100/graphql",
      auth.getAccessToken(),
      userQuery
    )
  );

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
        <div>
          <h3>Hello. Welcome to Mutodo.</h3>
          <NewUser />
        </div>
      )}
    </CenteredContent>
  );
}
