import React from "react";
import styled from "styled-components";

type TasklistsProps = {
  tasklists: Tasklist[];
};

type Tasklist = {
  id: number;
  name: string;
};

const TasklistItemContainer = styled.div`
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  border-width: 0.25px;
  padding: 0.25rem;
  background-color: palegreen;
`;

function TasklistsItem({ tasklist }: { tasklist: Tasklist }) {
  return <TasklistItemContainer>{tasklist.name}</TasklistItemContainer>;
}

export default function Tasklists({ tasklists }: TasklistsProps) {
  return (
    <div>
      {tasklists.map((tasklist, index) => (
        <TasklistsItem key={index} tasklist={tasklist} />
      ))}
    </div>
  );
}
