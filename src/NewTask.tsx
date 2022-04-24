import React from "react";
import { Button, FlexRowAlignCenter, ListItem, Input } from "./ui-components";

type NewTaskProps = {
  value: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
};

export default function NewTask({ value, onChange }: NewTaskProps) {
  return (
    <ListItem>
      <FlexRowAlignCenter>
        <Input
          onChange={(event) => {
            onChange(event);
          }}
          value={value}
        />
      </FlexRowAlignCenter>
    </ListItem>
  );
}
