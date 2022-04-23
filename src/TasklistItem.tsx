import React from "react";
import { Task } from "./types";
import { Checkbox, FlexRowAlignCenter, ListItem } from "./ui-components";

function TasklistItem({ task }: { task: Task }) {
  return (
    <ListItem key={task.id}>
      <FlexRowAlignCenter>
        <Checkbox />{task.name}
      </FlexRowAlignCenter>
    </ListItem>
  );
}

export default TasklistItem;
