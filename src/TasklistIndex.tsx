import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, FlexRowJustifyCenter, List, ListItem } from "./ui-components";

type TasklistIndexProps = {
  tasklists: Tasklist[];
};

type Tasklist = {
  id: string;
  name: string;
};

function TasklistIndexItem({ tasklist }: { tasklist: Tasklist }) {
  return (
    <ListItem>
      <Link to={`/tasklist/${tasklist.id}`}>{tasklist.name}</Link>
    </ListItem>
  );
}

export default function TasklistIndex({ tasklists }: TasklistIndexProps) {
  return (
    <Box>
      <List>
        {tasklists.map((tasklist) => (
          <TasklistIndexItem key={tasklist.id} tasklist={tasklist} />
        ))}
      </List>
      <FlexRowJustifyCenter>
        <Button>Create</Button>
      </FlexRowJustifyCenter>
    </Box>
  );
}
