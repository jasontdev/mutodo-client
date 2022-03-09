import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

export default function TaskLists({ taskLists }) {
  return (
    <Box>
      {taskLists.length > 0 ? (
        taskLists.map((title) => <Text>{title}</Text>)
      ) : (
        <Text>Sorry, no task lists available</Text>
      )}
    </Box>
  );
}

TaskLists.propTypes = {
  taskLists: PropTypes.arrayOf(PropTypes.string).isRequired,
};
