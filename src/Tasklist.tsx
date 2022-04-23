import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { auth, useAuth } from "./auth";
import graphql from "./graphql";
import { CenteredContent, Layout } from "./layout";
import Navbar from "./Navbar";


type ReceivedTask = {
  id: string;
  name: string;
}

export default function Tasklist() {
  const params = useParams();
  const auth = useAuth();
  const [ tasks, setTasks ] = useState<ReceivedTask[]>([]);

  const tasksQuery = `
    query Tasks {
      tasks(tasklist: "${params.tasklist_id}") {
        id
        name
      }
    }`

  const { data } = useQuery(["user"], () =>
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

    if(data.data.tasks) {
      setTasks(data.data.tasks);
    }

  }, [data]);
  
  return (
    <Layout>
      <Navbar title="Tasks" />
      <CenteredContent>
      {tasks.map((task) => <div key={task.id}>{task.name}</div>)}
      </CenteredContent>
    </Layout>
  );
}
