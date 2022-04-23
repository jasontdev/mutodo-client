import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./auth";
import graphql from "./graphql";
import { CenteredContent, Layout } from "./layout";
import Navbar from "./Navbar";
import TasklistItem from "./TasklistItem";
import { Task } from "./types";
import { Box, List } from "./ui-components";

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
            <List>
              {data.data.tasks.map((task: Task) => (
                <TasklistItem key={task.id} task={task} />
              ))}
            </List>
          )}
        </Box>
      </CenteredContent>
    </Layout>
  );
}
