import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./auth";
import graphql from "./graphql";
import { CenteredContent, Layout } from "./layout";
import Navbar from "./Navbar";
import TasklistItem from "./TasklistItem";
import NewTask from "./NewTask";
import { Task } from "./types";
import { Box, Button, FlexRowJustifyCenter, List } from "./ui-components";

export default function Tasklist() {
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const params = useParams();
  const auth = useAuth();

  const tasksQuery = `
    query Tasks {
      tasks(tasklist: "${params.tasklist_id}") {
        id
        name
      }
    }`;

  const { data, isLoading, isError, isRefetching } = useQuery(
    [params.tasklist_id],
    () =>
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

  function renderTasks(tasks: Task[]) {
    if (tasks.length === 0) {
      return (
        <FlexRowJustifyCenter>
          <h3>Tasklist is empty</h3>
        </FlexRowJustifyCenter>
      );
    }
    return (
      <div>
        {tasks.map((task: Task) => (
          <TasklistItem key={task.id} task={task} />
        ))}
      </div>
    );
  }

  return (
    <Layout>
      <Navbar title="Tasks" />
      <CenteredContent>
        <Box>
          {isLoading ? (
            <FlexRowJustifyCenter>
              <h3>Loading tasks...</h3>
            </FlexRowJustifyCenter>
          ) : isError ? (
            <FlexRowJustifyCenter>
              <h3>Error loading tasks.</h3>
            </FlexRowJustifyCenter>
          ) : isRefetching ? (
            <FlexRowJustifyCenter>
              <h3>Refreshing tasks...</h3>
            </FlexRowJustifyCenter> // TODO: display stale content while refreshing
          ) : (
            <List>
              {renderTasks(data.data.tasks)}
              {showNewTask ? (
                <NewTask
                  onChange={(event) =>
                    setNewTaskName(event.currentTarget.value)
                  }
                  value={newTaskName}
                />
              ) : (
                <div />
              )}
            </List>
          )}
          <FlexRowJustifyCenter>
            <Button onClick={() => setShowNewTask(true)}>Create</Button>
          </FlexRowJustifyCenter>
        </Box>
      </CenteredContent>
    </Layout>
  );
}
