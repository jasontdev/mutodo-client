import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./auth";
import graphql from "./graphql";
import { CenteredContent, Layout } from "./layout";
import Navbar from "./Navbar";
import TasklistItem from "./TasklistItem";
import NewTask from "./NewTask";
import { Task } from "./types";
import {
  Box,
  Button,
  ButtonOutline,
  FlexRowJustifyCenter,
  List,
} from "./ui-components";

export default function Tasklist() {
  const [newTaskName, setNewTaskName] = useState("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const params = useParams();
  const auth = useAuth();

  const tasksQuery = `
    query Tasks {
      tasks(tasklist: "${params.tasklist_id}") {
        id
        name
      }
    }`;

  const { data, isLoading, isError, refetch } = useQuery(
    [params.tasklist_id],
    () =>
      graphql.query(
        "http://localhost:4100/graphql",
        auth.getAccessToken(),
        tasksQuery
      )
  );

  const mutation = useMutation(
    (taskToDelete: { task: string; tasklist: string }) =>
      deleteTaskMutation(taskToDelete, auth.getAccessToken()),
    {
      onSuccess: () => {
        setShowNewTask(false);
        setSelectedTask("");
        setNewTaskName("");
        refetch();
      },
    }
  );

  const newTaskMutation = useMutation((newTask: {tasklistId: string; name: string}) => {
    return graphql.query(
        "http://localhost:4100/graphql",
        auth.getAccessToken(),
        `mutation NewTask {
          newTask(tasklist: "${newTask.tasklistId}", name: "${newTask.name}") {
              id
          }
        }
      `
      );
  }, {
    onSuccess: () => {
      setNewTaskName("");
      refetch();
    }
  });

  useEffect(() => {
    if (!auth.getAccessToken()) {
      window.location.replace(auth.loginUri());
    }
  });

  function selectOrDeselectTask(id: string) {
    setSelectedTask((prevState) => {
      if (prevState === id) {
        return "";
      } else {
        return id;
      }
    });
  }

  function renderTasks() {
    const tasks = data.data.tasks;
    if (tasks.length === 0 && showNewTask === false) {
      return (
        <FlexRowJustifyCenter>
          <h3>Tasklist is empty</h3>
        </FlexRowJustifyCenter>
      );
    }
    return (
      <List>
        {tasks.map((task: Task) => {
          return (
            <TasklistItem
              key={task.id}
              task={task}
              clickHandler={() => selectOrDeselectTask(task.id)}
              selected={task.id === selectedTask}
            />
          );
        })}
        {showNewTask ? (
          <NewTask
            onChange={(event) => setNewTaskName(event.currentTarget.value)}
            value={newTaskName}
          />
        ) : null}
      </List>
    );
  }

  function renderButtons() {
    function taskActionButtons() {
      return (
        <FlexRowJustifyCenter>
          <Button>Mark as Complete</Button>
          <ButtonOutline
            onClick={() =>
              mutation.mutate(
                { task: selectedTask, tasklist: params.tasklist_id },
                auth.getAccessToken()
              )
            }
          >
            Delete
          </ButtonOutline>
        </FlexRowJustifyCenter>
      );
    }

    return showNewTask ? (
      <FlexRowJustifyCenter>
        <Button
          onClick={() => {
            setShowNewTask(false);
            setNewTaskName("");
            newTaskMutation.mutate({tasklistId: params.tasklist_id, name: newTaskName});
          }}
        >
          Submit
        </Button>
        <ButtonOutline
          onClick={() => {
            setShowNewTask(false);
            setNewTaskName("");
          }}
        >
          Cancel
        </ButtonOutline>
      </FlexRowJustifyCenter>
    ) : selectedTask !== "" ? (
      taskActionButtons()
    ) : (
      <FlexRowJustifyCenter>
        <Button
          onClick={() => {
            setShowNewTask(true);
            setSelectedTask("");
          }}
        >
          New task
        </Button>
      </FlexRowJustifyCenter>
    );
  }

  async function deleteTaskMutation(
    { task, tasklist }: { task: string; tasklist: string },
    accessKey: string
  ) {
    return graphql.query(
      "http://localhost:4100/graphql",
      accessKey,
      `mutation DeleteTask {
        deleteTask(tasklist: "${tasklist}", task: "${task}") {
          id
        }
      }`
    );
  }

  return (
    <Layout>
      <Navbar title="Tasks" />
      <CenteredContent>
        <Box>
          {isLoading ? (
            <div />
          ) : isError ? (
            <FlexRowJustifyCenter>
              <h3>Error loading tasks.</h3>
            </FlexRowJustifyCenter>
          ) : renderTasks()
          }
          {renderButtons()}
        </Box>
      </CenteredContent>
    </Layout>
  );
}
