import React from "react";
import { gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import TaskLists from "../components/TaskLists";

const tasklistsQuery = gql`
  query GetTasklists($uuid: String!) {
    tasklists(uuid: $uuid) {
      title
    }
  }
`;

export default function Home() {
  const { uuid, jwt } = useLocation().state;
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TaskLists taskLists={[]} />
      <Button
        onClick={() => navigate("/create-tasklist", { state: { uuid, jwt } })}
      >
        Create tasklist
      </Button>
    </Box>
  );
}
