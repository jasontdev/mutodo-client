import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type TasklistsProps = {
  tasklists: Tasklist[];
};

type Tasklist = {
  id: string;
  name: string;
};

const TasklistItemContainer = styled.div`
  padding: 0 1rem 0 1rem;
`;

const TasklistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 0 0.5rem 0;
`

const TasklistsTitle = styled.div`
  font-weight: bold;
  font-size: larger;
  padding: 0 1rem 0.25rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border-color: lightgrey;
  border-width: 0.1rem;
`

function TasklistsItem({tasklist}: {tasklist: Tasklist}) {
  return <TasklistItemContainer><Link to={`/tasklist/${tasklist.id}`}>{tasklist.name}</Link></TasklistItemContainer>;
}

export default function Tasklists({ tasklists }: TasklistsProps) {
  return (
    <TasklistsContainer>
    <TasklistsTitle>Tasklists</TasklistsTitle>
      {tasklists.map((tasklist) => (
        <TasklistsItem key={tasklist.id} tasklist={tasklist} />
      ))}
    </TasklistsContainer>
  );
}
