import React, { useEffect } from "react";
import { useAuth } from "./auth";
import { useQuery } from "react-query";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";
import graphql from "./graphql";
import Tasklists from "./Tasklists";

const userQuery = `
      query User {
        tasklists {
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
      {data ? <Tasklists tasklists={data.data.tasklists} /> : <div />}
    </CenteredContent>
  );
}
