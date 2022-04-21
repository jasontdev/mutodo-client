import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, FlexRowJustifyCenter, List, ListItem } from "./ui-components";

type TasklistsProps = {
  tasklists: Tasklist[];
};

type Tasklist = {
  id: string;
  name: string;
};

function TasklistsItem({ tasklist }: { tasklist: Tasklist }) {
  return (
    <ListItem>
      <Link to={`/tasklist/${tasklist.id}`}>{tasklist.name}</Link>
    </ListItem>
  );
}

export default function Tasklists({ tasklists }: TasklistsProps) {
  return (
    <Box>
      <List>
        {tasklists.map((tasklist) => (
          <TasklistsItem key={tasklist.id} tasklist={tasklist} />
        ))}
      </List>
      <FlexRowJustifyCenter>
        <Button>Create</Button>
      </FlexRowJustifyCenter>
    </Box>
  );
}
