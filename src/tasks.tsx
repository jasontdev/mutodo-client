import React from "react";
import { useQuery } from "react-query";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";
import { useLocation } from "react-router-dom";
import Tasklists from "./Tasklists";

type LocationState = {
  jwt: string;
};

type Tasklist = {
  id: number;
  name: string;
};

export default function Home() {
  const location = useLocation();
  const { jwt } = location.state as LocationState;

  const { isLoading, data } = useQuery<Tasklist[]>(
    "tasklists",
    (): Promise<Tasklist[]> => {
      return new Promise((resolve) => {
        fetch("http://localhost:4100/graphql", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ query: "{tasklists {id name}}" }),
        }).then((res: Response) =>
          res.json().then((data: { data: { tasklists: Tasklist[] } }) => {
            resolve(data.data.tasklists);
          })
        );
    }
  );

  return (
    <CenteredContent>
      <Navbar />
      <h1>Tasks</h1>
    </CenteredContent>
  );
}
