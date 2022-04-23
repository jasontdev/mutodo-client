import React, { useEffect } from "react";
import { useAuth } from "./auth";
import { useQuery } from "react-query";
import Navbar from "./Navbar";
import { CenteredContent, Layout } from "./layout";
import graphql from "./graphql";
import TasklistIndex from "./TasklistIndex";

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
  const { data, status } = useQuery(["user"], () =>
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
    <Layout>
      <Navbar title="Tasklists" />
      <CenteredContent>
        {status === "loading" ? (
          <div>Loading tasklists...</div>
        ) : status === "error" ? (
          <div>Error fetching tasklists</div>
        ) : (
          <TasklistIndex tasklists={data.data.tasklists} />
        )}
      </CenteredContent>
    </Layout>
  );
}
