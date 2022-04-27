import React from "react";
import { Task } from "./types";
import { FlexRowAlignCenter, ListItem } from "./ui-components";

type TasklistItemProps = {
  task: Task;
  selected?: boolean;
  clickHandler: () => void;
};

function TasklistItem({ task, selected, clickHandler }: TasklistItemProps) {
  return (
    <ListItem key={task.id} selected={selected}>
      <FlexRowAlignCenter>
        <div onClick={clickHandler}>{task.name}</div>
      </FlexRowAlignCenter>
    </ListItem>
  );
}

export default TasklistItem;
