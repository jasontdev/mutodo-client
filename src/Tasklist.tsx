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

enum Mode {
  NothingSelected,
  TaskSelected,
  NewTask,
}

export default function Tasklist() {
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [mode, setMode] = useState(Mode.NothingSelected);
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

  const deleteTask = useMutation(
    ({
      task,
      tasklist,
      accessToken,
    }: {
      task: string;
      tasklist: string;
      accessToken: string;
    }) => {
      return graphql.query(
        "http://localhost:4100/graphql",
        accessToken,
        `mutation DeleteTask {
        deleteTask(tasklist: "${tasklist}", task: "${task}") {
          id
        }
      }`
      );
    },
    {
      onSuccess: () => {
        setMode(Mode.NothingSelected);
        setSelectedTask("");
        setNewTaskName("");
        refetch();
      },
    }
  );

  const newTaskMutation = useMutation(
    ({
      tasklist,
      name,
      accessToken,
    }: {
      accessToken: string;
      tasklist: string;
      name: string;
    }) => {
      return graphql.query(
        "http://localhost:4100/graphql",
        accessToken,
        `mutation NewTask {
          newTask(tasklist: "${tasklist}", name: "${name}") {
              id
          }
        }`
      );
    },
    {
      onSuccess: () => {
        setNewTaskName("");
        refetch();
      },
    }
  );

  useEffect(() => {
    if (!auth.getAccessToken()) {
      window.location.replace(auth.loginUri());
    }
  });

  function toggleSelection(id: string) {
    if (id === selectedTask) {
      setSelectedTask("");
      setMode(Mode.NothingSelected);
    } else {
      setSelectedTask(id);
      setMode(Mode.TaskSelected);
    }
  }

  function renderTasks() {
    const tasks = data.data.tasks;
    if (tasks.length === 0 && mode !== Mode.NewTask) {
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
              clickHandler={() => toggleSelection(task.id)}
              selected={task.id === selectedTask}
            />
          );
        })}
        {mode === Mode.NewTask ? (
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
              deleteTask.mutate({
                task: selectedTask,
                tasklist: params.tasklist_id,
                accessToken: auth.getAccessToken(),
              })
            }
          >
            Delete
          </ButtonOutline>
        </FlexRowJustifyCenter>
      );
    }

    function createNewTaskButton() {
      return (
        <FlexRowJustifyCenter>
          <Button
            onClick={() => {
              setMode(Mode.NewTask);
            }}
          >
            Create
          </Button>
        </FlexRowJustifyCenter>
      );
    }

    function newTaskButtons() {
      return (
        <FlexRowJustifyCenter>
          <Button
            onClick={() => {
              newTaskMutation.mutate({
                accessToken: auth.getAccessToken(),
                tasklist: params.tasklist_id,
                name: newTaskName,
              });
            }}
          >
            Submit
          </Button>
          <ButtonOutline
            onClick={() => {
              setMode(Mode.TaskSelected);
              setNewTaskName("");
            }}
          >
            Cancel
          </ButtonOutline>
        </FlexRowJustifyCenter>
      );
    }
    switch (mode) {
      case Mode.TaskSelected: {
        return taskActionButtons();
      }
      case Mode.NothingSelected: {
        return createNewTaskButton();
      }
      case Mode.NewTask: {
        return newTaskButtons();
      }
    }
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
          ) : (
            renderTasks()
          )}
          {renderButtons()}
        </Box>
      </CenteredContent>
    </Layout>
  );
}
