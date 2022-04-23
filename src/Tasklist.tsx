import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./auth";
import graphql from "./graphql";
import { CenteredContent, Layout } from "./layout";
import Navbar from "./Navbar";
import { Box } from "./ui-components";

type Task = {
  id: string;
  name: string;
};

export default function Tasklist() {
  const params = useParams();
  const auth = useAuth();

  const tasksQuery = `
    query Tasks {
      tasks(tasklist: "${params.tasklist_id}") {
        id
        name
      }
    }`;

  const { data, isLoading, isError, isRefetching } = useQuery(["user"], () =>
    graphql.query(
      "http://localhost:4100/graphql",
      auth.getAccessToken(),
      tasksQuery
    )
  );

  useEffect(() => {
    if (!auth.getAccessToken()) {
      window.location.replace(auth.loginUri());
    }
  });

  return (
    <Layout>
      <Navbar title="Tasks" />
      <CenteredContent>
        <Box>
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : isError ? (
            <div>Error loading tasks.</div>
          ) : isRefetching ? (
            <div /> // TODO: display stale content while refreshing
          ) : (
            data.data.tasks.map((task: Task) => (
              <div key={task.id}>{task.name}</div>
            ))
          )}
        </Box>
      </CenteredContent>
    </Layout>
  );
}
