import React from "react";
import { Link } from "react-router-dom";
import { Box, BoxTitle, Button, List } from "./ui-components"

type TasklistsProps = {
  tasklists: Tasklist[];
};

type Tasklist = {
  id: string;
  name: string;
};

function TasklistsItem({ tasklist }: { tasklist: Tasklist }) {
  return <Link to={`/tasklist/${tasklist.id}`}>{tasklist.name}</Link>
}

export default function Tasklists({ tasklists }: TasklistsProps) {
  return (
    <Box>
        <BoxTitle>Tasklists</BoxTitle>
        <List>
          {tasklists.map((tasklist) => (
            <TasklistsItem key={tasklist.id} tasklist={tasklist} />
          ))}
        </List>
      <div>
        <Button>Create</Button>
      </div>
    </Box>
  );
}
